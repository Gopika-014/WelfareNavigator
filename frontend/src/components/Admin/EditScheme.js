import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const EditScheme = () => {
  const { id } = useParams(); // Get scheme ID from URL
  const navigate = useNavigate();
  const [scheme, setScheme] = useState({ name: "", schemeType: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch scheme details
  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/schemes/${id}`);
        setScheme(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching scheme details");
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/schemes/update/${id}`, scheme);
      alert("Scheme updated successfully");
      navigate("/admin/manage-schemes"); // Redirect to manage schemes page
    } catch (err) {
      setError("Error updating scheme");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 p-6 bg-white overflow-auto flex ">
      <div className="w-full max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Scheme</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Scheme Name:</label>
            <input
              type="text"
              value={scheme.name}
              onChange={(e) => setScheme({ ...scheme, name: e.target.value })}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Scheme Type:</label>
            <input
              type="text"
              value={scheme.schemeType}
              onChange={(e) => setScheme({ ...scheme, schemeType: e.target.value })}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              value={scheme.description}
              onChange={(e) => setScheme({ ...scheme, description: e.target.value })}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Eligibility</label>
            <textarea
            value={scheme.eligibility}
            onChange={(e)=> setScheme({...scheme,eligibility:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <div>
            <label className="block font-medium">Application Process</label>
            <textarea
            value={scheme.applicationProcess}
            onChange={(e)=> setScheme({...scheme,applicationProcess:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <div>
            <label className="block font-medium">Benefits</label>
            <textarea
            value={scheme.benefits}
            onChange={(e)=> setScheme({...scheme,benefits:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <div>
            <label className="block font-medium">Required Documents</label>
            <textarea
            value={scheme.documentsRequired}
            onChange={(e)=> setScheme({...scheme,documentsRequired:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <div>
            <label className="block font-medium">Contact Details</label>
            <textarea
            value={scheme.contactDetails}
            onChange={(e)=> setScheme({...scheme,contactDetails:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <div>
            <label className="block font-medium">Application Link</label>
            <textarea
            value={scheme.applyLink}
            onChange={(e)=> setScheme({...scheme,applyLink:e.target.value})}
            className="w-full border p-2" required/>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update Scheme
          </button>
        </form>
      )}
      </div>
    </div>
    </div>
  );
};

export default EditScheme;
