import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Footer from "../Footer";
const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  // Fetch schemes from backend
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/schemes"); // Adjust API URL
        setSchemes(response.data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  // Delete scheme
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scheme?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/schemes/delete/${id}`); // Adjust API URL
      setSchemes(schemes.filter((scheme) => scheme._id !== id));
    } catch (error) {
      console.error("Error deleting scheme:", error);
    }
  };

  // Handle update (navigate to edit page)
  const handleUpdate = (id) => {
    window.location.href = `/edit-scheme/${id}`;
  };

  return (
    
    <div className="flex h-screen" >
      <Sidebar/>
      <div className="flex-1 p-6 bg-white overflow-auto flex ">
      <div className="w-full max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Schemes</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schemes.length > 0 ? (
            schemes.map((scheme) => (
              <tr key={scheme._id}>
                <td className="p-2 border">{scheme.name}</td>
                <td className="p-2 border">{scheme.schemeType}</td>
                <td className="p-2 border flex space-x-4">
                  <button
                    onClick={() => handleUpdate(scheme._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(scheme._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No schemes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div></div>
    
  );

};

export default ManageSchemes;
