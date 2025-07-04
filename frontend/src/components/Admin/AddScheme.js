/*import { useState } from "react";
import axios from "axios";

const AddScheme = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eligibility: "",
    applicationProcess: "",
    applyLink: "",
    benefits: "",
    documentsRequired: "",
    contactDetails: "",
    categoryId: "",
    schemeType: "state",
    stateName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "categoryId" ? Number(e.target.value) : e.target.value,
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/schemes/add", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        description: "",
        eligibility: "",
        applicationProcess: "",
        applyLink: "",
        benefits: "",
        documentsRequired: "",
        contactDetails: "",
        categoryId: "",
        schemeType: "state",
        stateName: "",
      });
    } catch (error) {
      setMessage("Failed to add scheme");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Scheme</h1>
      {message && <p className="text-center text-lg text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Scheme Name *
        <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Scheme Name" value={formData.name} onChange={handleChange} required />

        {/* Description *
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>

        {/* Eligibility *
        <textarea className="w-full p-2 border rounded" name="eligibility" placeholder="Eligibility" value={formData.eligibility} onChange={handleChange} required></textarea>

        {/* Application Process *
        <textarea className="w-full p-2 border rounded" name="applicationProcess" placeholder="Application Process" value={formData.applicationProcess} onChange={handleChange}></textarea>

        {/* Apply Link *
        <input className="w-full p-2 border rounded" type="url" name="applyLink" placeholder="Application Link" value={formData.applyLink} onChange={handleChange} />

        {/* Benefits *
        <textarea className="w-full p-2 border rounded" name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleChange}></textarea>

        {/* Documents Required *
        <input className="w-full p-2 border rounded" type="text" name="documentsRequired" placeholder="Documents Required (comma-separated)" value={formData.documentsRequired} onChange={handleChange} />

        {/* Contact Details *
        <input className="w-full p-2 border rounded" type="text" name="contactDetails" placeholder="Contact Details" value={formData.contactDetails} onChange={handleChange} />

        {/* Category ID *
        <input className="w-full p-2 border rounded" type="number" name="categoryId" placeholder="Category ID" value={formData.categoryId} onChange={handleChange} required />

        {/* Scheme Type *
        <select className="w-full p-2 border rounded" name="schemeType" value={formData.schemeType} onChange={handleChange} required>
          <option value="state">State Government</option>
          <option value="central">Central Government</option>
        </select>

        {/* State Name (Only for State Government Schemes) *
        {formData.schemeType === "state" && (
          <input className="w-full p-2 border rounded" type="text" name="stateName" placeholder="State Name" value={formData.stateName} onChange={handleChange} />
        )}

        {/* Submit Button *
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Submitting..." : "Submit Scheme"}
        </button>
      </form>
    </div>
  );
};

export default AddScheme;*/
import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar

const AddScheme = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eligibility: "",
    applicationProcess: "",
    applyLink: "",
    benefits: "",
    documentsRequired: "",
    contactDetails: "",
    categoryId: "",
    schemeType: "state",
    stateName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "categoryId" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/schemes/add", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        description: "",
        eligibility: "",
        applicationProcess: "",
        applyLink: "",
        benefits: "",
        documentsRequired: "",
        contactDetails: "",
        categoryId: "",
        schemeType: "state",
        stateName: "",
      });
    } catch (error) {
      setMessage("Failed to add scheme");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white overflow-auto flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 mt-32">Add New Scheme</h1>
          {message && <p className="text-center text-lg text-green-600">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Scheme Name" value={formData.name} onChange={handleChange} required />
            <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
            <textarea className="w-full p-2 border rounded" name="eligibility" placeholder="Eligibility" value={formData.eligibility} onChange={handleChange} required></textarea>
            <textarea className="w-full p-2 border rounded" name="applicationProcess" placeholder="Application Process" value={formData.applicationProcess} onChange={handleChange}></textarea>
            <input className="w-full p-2 border rounded" type="url" name="applyLink" placeholder="Application Link" value={formData.applyLink} onChange={handleChange} />
            <textarea className="w-full p-2 border rounded" name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleChange}></textarea>
            <input className="w-full p-2 border rounded" type="text" name="documentsRequired" placeholder="Documents Required (comma-separated)" value={formData.documentsRequired} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="text" name="contactDetails" placeholder="Contact Details" value={formData.contactDetails} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="number" name="categoryId" placeholder="Category ID" value={formData.categoryId} onChange={handleChange} required />
            <select className="w-full p-2 border rounded" name="schemeType" value={formData.schemeType} onChange={handleChange} required>
              <option value="state">State Government</option>
              <option value="central">Central Government</option>
            </select>
            {formData.schemeType === "state" && (
              <input className="w-full p-2 border rounded" type="text" name="stateName" placeholder="State Name" value={formData.stateName} onChange={handleChange} />
            )}
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? "Submitting..." : "Submit Scheme"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScheme;
