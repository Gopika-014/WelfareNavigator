import { configureStore } from "@reduxjs/toolkit";
import grievancesReducer from "./grievancesSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    grievances: grievancesReducer,
  },
});

export default store;
