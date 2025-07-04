import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

// API Base URL
const API_URL = "http://localhost:8000/api/grievances";

// Fetch grievances for a user
export const fetchUserGrievances = createAsyncThunk(
  "grievances/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Submit a new grievance
/*export const submitGrievance = createAsyncThunk(
  "grievances/submit",
  async (grievanceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/grievances/submit`, grievanceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);*/
// Submit a new grievance
export const submitGrievance = createAsyncThunk(
  "grievances/submit",
  async ({ grievanceData, token }, { rejectWithValue }) => {
    try {
      console.log("token:", token);  // Check if token is available
      console.log("Grievance data:", grievanceData);  // This will log the form data
      console.log("Form Data before dispatch:");
        for (let pair of grievanceData.entries()) {
        console.log(pair[0] + ": " + pair[1]);  // Logs key-value pairs
        }


      const response = await axios.post(
        `http://localhost:8000/api/grievances/submit`,
        grievanceData,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
            "Content-Type": "multipart/form-data", // If you're sending FormData (with files)
          },
        }
        
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Redux Slice
const grievancesSlice = createSlice({
  name: "grievances",
  initialState: {
    grievances: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch grievances
      .addCase(fetchUserGrievances.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserGrievances.fulfilled, (state, action) => {
        state.loading = false;
        state.grievances = action.payload;
      })
      .addCase(fetchUserGrievances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit grievance
      .addCase(submitGrievance.pending, (state) => {
        state.loading = true;
        toast.success("Grievance submitted successfully!");
      })
      .addCase(submitGrievance.fulfilled, (state, action) => {
        state.loading = false;
        state.grievances.push(action.payload);
      })
      .addCase(submitGrievance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Failed to submit grievance.");
      });
  },
});

export default grievancesSlice.reducer;
