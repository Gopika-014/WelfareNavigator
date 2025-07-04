import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const AdminGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all grievances
  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:8000/api/grievances/allgrievances") // Fetch all grievances
      .then((res) => {
        // Access the grievances from the response object
        setGrievances(res.data.grievances); // Assuming the response is an object with 'grievances' as a key
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching grievances:", err);
        setError("Failed to fetch grievances.");
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once on component mount

  // Handle grievance status update
  const handleUpdate = (id, status) => {
    axios
      .put(`http://localhost:8000/api/grievances/resolve/${id}`, { status })
      .then(() => {
        setGrievances((prevGrievances) =>
          prevGrievances.map((g) =>
            g._id === id ? { ...g, status } : g
          )
        );
      })
      .catch((err) => console.error("Error updating grievance:", err));
  };

  const handleMessage = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-6  bg-gray-100">


      <h2 className="text-2xl font-bold mb-6">Manage All Grievances</h2>

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display All Grievances */}
      {grievances.length === 0 && !loading && !error ? (
        <p>No grievances found.</p>
      ) : (
        grievances.map((grievance) => (
          <div key={grievance._id} className="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 className="text-lg font-semibold">Category: {grievance.category}</h3>
            <p className="text-gray-700">{grievance.description}</p>
            <p className="text-sm text-gray-500">Status: {grievance.status}</p>
            <p className="text-sm text-gray-500">User: {grievance.user.name}</p> {/* Showing the user's name */}

            {/* Status Update Dropdown */}
            <label className="block mt-2 font-medium">Update Status:</label>
            <select
              className="border p-2 rounded-md mt-1"
              value={grievance.status}
              onChange={(e) => handleUpdate(grievance._id, e.target.value)}
         
            >
           
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
           
           {/* Send Email Button */}
          
                <button
                  className="bg-blue-500 text-white m-2 px-4 py-2 rounded-md"
                  onClick={() => handleMessage(grievance.user.email)}
                >
                  Send Email to User
                </button>
             
            
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default AdminGrievances;
