import React, { useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { submitGrievance } from "../../redux/grievancesSlice";

const GrievanceForm = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("category", category);
    formData.append("description", description);
    if (file) {
      formData.append("document", file);
    }
    console.log("Form Data:");
    console.log("userId:", userId);
    console.log("category:", category);
    console.log("description:", description);
    console.log("file:", file);
    console.log("Form Data before dispatch:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);  // Logs key-value pairs
    }
    //console.log("Form data before dispatch:", formData);
    dispatch(submitGrievance({ grievanceData: formData, token }));

    setCategory("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit a Grievance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Financial">Financial</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Document (Optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Grievance
        </button>
      </form>
    </div>
  );
};

export default GrievanceForm;
