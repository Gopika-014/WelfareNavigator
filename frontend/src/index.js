// src/index.js

import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "leaflet/dist/leaflet.css"; // Important for Leaflet styling
//import AdminDashboard from "./components/Admin/AdminDashboard";

// Create root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
