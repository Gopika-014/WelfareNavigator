import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../Footer";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalSchemes: 0, stateSchemes: 0, centralSchemes: 0 });
  const [grievances, setGrievances] = useState([]); // Ensure it's an array

  useEffect(() => {
    // Fetch statistics from the backend
    fetch("http://localhost:8000/api/schemes/scheme-counts")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching stats:", error));

    // Fetch grievances from the backend
    fetch("http://localhost:8000/api/allgrievances")
      .then((res) => res.json())
      .then((data) => {
        // Ensure grievances is an array before setting state
        setGrievances(Array.isArray(data.grievances) ? data.grievances : []);
      })
      .catch((error) => {
        console.error("Error fetching grievances:", error);
        setGrievances([]); // Set an empty array in case of error
      });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-500 p-6 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Schemes</h2>
            <p className="text-3xl">{stats.totalSchemes}</p>
          </div>
          <div className="bg-green-500 p-6 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">State Gov Schemes</h2>
            <p className="text-3xl">{stats.stateSchemes}</p>
          </div>
          <div className="bg-yellow-500 p-6 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Central Gov Schemes</h2>
            <p className="text-3xl">{stats.centralSchemes}</p>
          </div>
        </div>

        {/* Grievance Management Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Grievances</h2>
          {grievances.length === 0 ? (
            <p className="text-gray-600">No grievances found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {grievances.map((grievance) => (
                  <tr key={grievance._id} className="text-center border">
                    <td className="p-2 border">{grievance.user?.name || "Unknown"}</td>
                    <td className="p-2 border">{grievance.description}</td>
                    <td className="p-2 border">{grievance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4">
            <Link to="/admin/grievances" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
