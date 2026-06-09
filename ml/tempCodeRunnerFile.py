import json
import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load models and metadata
model_dict = joblib.load(os.path.join("models", "schememodels.joblib"))

with open(os.path.join("models", "schemefields.json")) as f:
    schemefields = json.load(f)

reference_df = pd.read_csv(os.path.join("dataset", "Mainproject.csv"))

labelencoders = joblib.load(os.path.join("models", "labelencoders.joblib"))

with open(os.path.join("models", "binarycols.json")) as f:
    binarycols = json.load(f)


# ✅ Preprocess user input
def preprocess_user_data(user_data_raw, binarycols, labelencoders):
    print("\n📥 Raw user input:", user_data_raw)
    processed_data = {}

    for field, value in user_data_raw.items():
        if value == "" or value is None:
            continue

        if field in binarycols:
            str_val = str(value).strip().lower()
            processed_data[field] = (
                1 if str_val in ['yes', 'true', '1']
                else 0 if str_val in ['no', 'false', '0']
                else None
            )

        elif field in labelencoders:
            encoder = labelencoders[field]
            try:
                processed_data[field] = encoder.transform([value])[0]
            except ValueError:
                try:
                    default_val = reference_df[field].mode()[0]
                    processed_data[field] = encoder.transform([default_val])[0]
                except Exception as e:
                    print(f"⚠️ Encoding error for {field}: {e}")
                    processed_data[field] = None
        else:
            try:
                processed_data[field] = float(value)
            except ValueError:
                processed_data[field] = None

    print("✅ Processed user input:", processed_data)
    return processed_data


# ✅ Smart fallback strategy
def get_fallback_value(field, df_scheme, reference_df, labelencoders, binarycols):
    try:
        if field in binarycols:
            mode_val = df_scheme[field].mode()
            if not mode_val.empty:
                val = str(mode_val.iloc[0]).strip().lower()
            else:
                val = str(reference_df[field].mode().iloc[0]).strip().lower()
            return 1 if val in ['yes', 'true', '1'] else 0 if val in ['no', 'false', '0'] else 0

        elif field in labelencoders:
            mode_val = df_scheme[field].mode()
            if not mode_val.empty:
                return labelencoders[field].transform([mode_val.iloc[0]])[0]
            return labelencoders[field].transform([reference_df[field].mode().iloc[0]])[0]

        elif pd.api.types.is_numeric_dtype(reference_df[field]):
            median_val = df_scheme[field].median()
            if not pd.isna(median_val):
                return median_val
            return reference_df[field].median()

    except Exception as e:
        print(f"⚠️ Fallback error for '{field}': {e}")

    return 0


@app.route("/", methods=["GET"])
def home():
    return "✅ Scheme Eligibility API is live!"


@app.route("/predict", methods=["POST"])
def predict():
    user_data_raw = request.json
    user_data = preprocess_user_data(user_data_raw, binarycols, labelencoders)

    eligible_schemes = []

    for scheme, model in model_dict.items():
        fields = schemefields.get(scheme, [])
        df_scheme = reference_df[reference_df["Scheme Name"] == scheme]
        vector = []
        filled_fields = 0
        valid_match = False

        print(f"\n🔍 Processing scheme: {scheme}")
        print("🧩 Required fields:", fields)

        for field in fields:
            if field in user_data and user_data[field] is not None:
                vector.append(user_data[field])
                filled_fields += 1
                valid_match = True
                print(f"✅ Field '{field}' provided by user: {user_data[field]}")
            else:
                fallback = get_fallback_value(field, df_scheme, reference_df, labelencoders, binarycols)
                print(f"📉 Using fallback for '{field}': {fallback}")
                vector.append(fallback)

        try:
            if not valid_match:
                print("🚫 Skipping scheme due to no matching user data")
                continue

            if filled_fields == 0:
                print("🚫 Skipping scheme due to no fields provided by user")
                continue

            vector = [float(v) for v in vector]
            prob = model.predict_proba(np.array(vector).reshape(1, -1))[0][1]

            field_match_ratio = filled_fields / len(fields)
            adjusted_confidence = round(prob * field_match_ratio * 100, 1)
            raw_confidence = round(prob * 100, 1)
            match_percent = round(field_match_ratio * 100, 1)

            is_uncertain = field_match_ratio < 0.5

            print(f"✅ Considered: {scheme} — Raw: {raw_confidence}% | Field Match: {match_percent}% | Final: {adjusted_confidence}% | Uncertain: {is_uncertain}")

            if adjusted_confidence > 0:
                eligible_schemes.append({
                    "scheme": scheme,
                    "confidence": adjusted_confidence,
                    "rawConfidence": raw_confidence,
                    "fieldMatch": match_percent,
                    "uncertain": is_uncertain
                })
            else:
                print(f"🚫 Skipping {scheme} due to 0% adjusted confidence")

        except Exception as e:
            print(f"❌ Error predicting {scheme}: {e}")
            continue

    return jsonify(eligible_schemes)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
