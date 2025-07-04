import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from "../Header";

const SCHEME_CATEGORY_MAP = {
  "Pudhumai Penn Scheme": "education",
  "7.5% Government School Quota Scholarship": "education",
  "Tamil Puthalvan Scheme": "education",
  "Free Education Scheme (BC/MBC/DNC Students)": "education",
  "Chief Minister Merit Award": "education",
  "Assistance For Delivery / Miscarriage Of Pregnancy To Female Differently Abled Person": "health",
  "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)": "health",
  "Old Age Homes - Tamil Nadu": "health",
  "Maternity Loan via SHGs - District Central Cooperative Banks": "health",
  "Financial Assistance for Medical Treatment of Journalists": "health"
};

const SchemePredictor = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};

  const [schemeType, setSchemeType] = useState('');
  const [userData, setUserData] = useState({
    'Gender': '',
    'Disabled (PWD)': '',
    'Medical Proof of Delivery/Miscarriage': '',
    'State': '',
    'Annual Income': '',
    'Name Present on Ration Card': '',
    'Submitted Documents': '',
    'Applying as NGO': '',
    'NGO Registered under Societies Act': '',
    'NGO Registered under Senior Citizens Rules 2009': '',
    'Pregnant or Lactating': '',
    'SHG Member': '',
    'Registered Journalist': '',
    'Proof of Profession': '',
    'Studied in Govt School': '',
    'Currently Pursuing': '',
    'First-generation College Goer': '',
    'Institution Type': '',
    'Caste Category': '',
    'Top 1000 Scorer': '',
    '7.5% Quota Admission': ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userDetails) {
      setUserData((prev) => ({
        ...prev,
        'Gender': userDetails?.profile?.gender || '',
        'State': userDetails?.State || '',
        'Annual Income': userDetails?.profile?.incomeLevel || '',
        'Caste Category':userDetails?.profile?.casteCategory || '',
        'State':userDetails?.profile?.state || '',
      }));
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.post('http://localhost:5000/predict', userData);
      const filteredResults = response.data.filter(item =>
        SCHEME_CATEGORY_MAP[item.scheme] === schemeType
      );
      setResults(filteredResults);
    } catch (err) {
      setError('Something went wrong while fetching predictions.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const yesNoOptions = [
    { value: '', label: 'Select' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Maharashtra', label: 'Maharashtra' }
  ];

  const casteOptions = [
    { value: '', label: 'Select Caste Category' },
    { value: 'BC', label: 'BC' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' }
  ];

  const currentlyPursuingOptions = [
    { value: '', label: 'Select' },
    { value: 'UG', label: 'UG' },
    { value: 'PG', label: 'PG' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Polytechnic', label: 'Polytechnic' },
    { value: 'School', label: 'School' }
  ];

  const institutionTypeOptions = [
    { value: '', label: 'Select' },
    { value: 'Govt', label: 'Government' },
    { value: 'Private', label: 'Private' }
  ];

  const fieldLabelMap = {
    "Studied in Govt School": "Have you studied in a government school?",
    "First-generation College Goer": "Are you a first-generation college goer?",
    "Currently Pursuing": "What are you currently pursuing?",
    "Institution Type": "Select your institution type",
    "7.5% Quota Admission": "Have you been admitted through 7.5% quota?",
    "Top 1000 Scorer": "Are you a Top 1000 Scorer?",
    "Registered Journalist": "Are you a registered journalist?",
    "SHG Member": "Are you a Self-Help Group (SHG) member?",
    "Pregnant or Lactating": "Are you currently pregnant or lactating?",
    "Applying as NGO": "Are you applying as an NGO?",
    "Name Present on Ration Card": "Is your name present on the ration card?",
    "Proof of Profession": "Have you submitted proof of your profession?",
    "Submitted Documents": "Have you submitted the required documents?",
    "Disabled (PWD)": "Are you a person with disability (PWD)?",
    "Medical Proof of Delivery/Miscarriage": "Have you submitted medical proof of delivery/miscarriage?",
    "NGO Registered under Societies Act": "Is your NGO registered under the Societies Act?",
    "NGO Registered under Senior Citizens Rules 2009": "Is your NGO registered under Senior Citizens Rules 2009?"
  };

  const healthWelfareFields = [
    "Gender", "Disabled (PWD)", "Medical Proof of Delivery/Miscarriage", "State", "Annual Income",
    "Name Present on Ration Card", "Submitted Documents", "Applying as NGO",
    "NGO Registered under Societies Act", "NGO Registered under Senior Citizens Rules 2009",
    "Pregnant or Lactating", "SHG Member", "Registered Journalist", "Proof of Profession"
  ];

  const educationFields = [
    "Gender", "Studied in Govt School", "Currently Pursuing", "First-generation College Goer",
    "Institution Type", "State", "7.5% Quota Admission", "Caste Category", "Annual Income", "Top 1000 Scorer"
  ];

  const renderFields = (fields) => {
    return fields.map((field) => {
      const commonProps = {
        name: field,
        className: "w-full p-2 border rounded",
        value: userData[field],
        onChange: handleChange
      };

      let label = fieldLabelMap[field] || field;

      if (field === "Gender") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <select {...commonProps}>
              {genderOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        );
      }

      if (field === "State") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <select {...commonProps}>
              {stateOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        );
      }

      if (field === "Caste Category") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <select {...commonProps}>
              {casteOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        );
      }

      if (field === "Annual Income") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <input type="number" {...commonProps} />
          </div>
        );
      }

      if (field === "Currently Pursuing") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <select {...commonProps}>
              {currentlyPursuingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      }

      if (field === "Institution Type") {
        return (
          <div key={field}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <select {...commonProps}>
              {institutionTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      }

      return (
        <div key={field}>
          <label className="block mb-1 font-medium text-gray-700">{label}</label>
          <select {...commonProps}>
            {yesNoOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Scheme Eligibility Checker</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Select Scheme Type</label>
        <select
          className="w-full p-2 border rounded"
          value={schemeType}
          onChange={(e) => setSchemeType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="health">Health & Welfare Schemes</option>
          <option value="education">Education Schemes</option>
        </select>
      </div>

      <div className="space-y-4">
        {schemeType === 'health' && renderFields(healthWelfareFields)}
        {schemeType === 'education' && renderFields(educationFields)}
        {schemeType === '' && (
          <p className="text-gray-500 text-sm">Please select a scheme type to begin.</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Eligibility'}
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">✅ You may be eligible for:</h3>
          <ul className="space-y-3">
            {results.map((scheme, index) => (
              <li key={index} className="p-3 border rounded bg-green-50 shadow-sm">
                <p className="font-semibold text-green-700">{scheme.scheme}</p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Likelihood of Eligibility:</strong> {scheme.confidence}%<br />
                  <strong>Your Info Match:</strong> {scheme.fieldMatch}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SchemePredictor;
