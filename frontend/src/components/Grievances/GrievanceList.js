import React, { useEffect, useState } from "react";
import axios from "axios";

const GrievanceList = ({ userId }) => {
  console.log("User ID:", userId);
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState(null);
  
  // Get token from localStorage
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchGrievances = async () => {
      if (!token) {
        setError("No token found. Please login again.");
        return; // Prevent the request if no token
      }
      
      if (!userId) {
        setError("No user ID provided.");
        return; // Prevent the request if no userId
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/grievances/user/${userId}`, {
         
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with token
          }
        });
        console.log("Response from API:", response);
        
        if (response.data.success) {
          setGrievances(response.data.grievances); // Set grievances if the response is successful
        } else {
          setError(response.data.message || "No grievances found.");
        }
      } catch (err) {
        console.error("Error fetching grievances:", err);
        
      }
    };

    fetchGrievances();
  }, [userId, token]); // Re-run effect when userId or token changes

  return (

    <div className="mt-4">
      
      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

      {grievances.length > 0 ? (
        <ul className="list-disc ml-6">
          {grievances.map((grievance) => (
            <li key={grievance._id} className="mt-2">
              <strong>{grievance.category}</strong>: {grievance.description}{" "}
              <span className={`text-sm ${grievance.status === "Resolved" ? "text-green-600" : "text-yellow-600"}`}>
                ({grievance.status})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No grievances submitted yet.</p>
      )}
    </div>
   
  );
};

export default GrievanceList;
