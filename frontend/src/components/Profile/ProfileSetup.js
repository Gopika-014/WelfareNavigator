import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    gender: "",
    dob: "",
    incomeLevel: "",
    education: "",
    occupation: "",
    address: "",
    profilePicture: "",
    casteCategory: "",
    religion: "",
    state: "",
    documents: [],
   
  });

  // Fetch existing profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      console.log("user id in profile setup:", id);
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.profile) {
          setProfileData({
            gender: response.data.profile.gender || "",
            dob: response.data.profile.dob || "",
            incomeLevel: response.data.profile.incomeLevel || "",
            education: response.data.profile.education || "",
            occupation: response.data.profile.occupation || "",
            address: response.data.profile.address || "",
            profilePicture: response.data.profile.profilePicture || "",
            casteCategory: response.data.profile.casteCategory || "",
            religion: response.data.profile.religion || "",
            state: response.data.profile.state || "",
            documents: response.data.profile.documents || [],
            
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "citizenaid_uploads");
      formData.append("folder", "profile_pictures");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dgrzijagf/image/upload`,
        formData
      );

      setProfileData({ ...profileData, profilePicture: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleDocumentChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedDocs = [...profileData.documents];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "citizenaid_uploads");
        formData.append("folder", "documents");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dgrzijagf/raw/upload`,
          formData
        );

        uploadedDocs.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    }

    setProfileData((prevData) => ({ ...prevData, documents: uploadedDocs }));
  };

  const handleDeleteDocument = (index) => {
    const updatedDocs = profileData.documents.filter((_, i) => i !== index);
    setProfileData((prevData) => ({ ...prevData, documents: updatedDocs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    try {
      await axios.put(`http://localhost:8000/api/auth/profile/${id}`, { profile: profileData }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center mt-16 p-8">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Setup</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                  {profileData.profilePicture ? (
                    <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-gray-600 flex items-center justify-center h-full">No Image</p>
                  )}
                </div>
                <div>
                  <label htmlFor="profilePicture" className="cursor-pointer text-blue-600 hover:underline">
                    Upload Profile Photo
                  </label>
                  <input type="file" id="profilePicture" className="hidden" onChange={handleFileChange} />
                </div>
              </div>

              {/* Gender & DOB */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Gender</label>
                  <select name="gender" value={profileData.gender} onChange={handleChange} className="w-full p-2 border rounded-md">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Date of Birth</label>
                  <input type="date" name="dob" value={profileData.dob} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>
              </div>

              {/* Income Level & Education */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Income Level</label>
                  <input type="text" name="incomeLevel" value={profileData.incomeLevel} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Education</label>
                  <input type="text" name="education" value={profileData.education} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>
              </div>
              
              {/* Occupation */}
              <div>
                <label className="block text-gray-700">Occupation</label>
                <input type="text" name="occupation" value={profileData.occupation} onChange={handleChange} className="w-full p-2 border rounded-md" />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700">Address</label>
                <input type="text" name="address" value={profileData.address} onChange={handleChange} className="w-full p-2 border rounded-md" />
              </div>

              {/* Caste Category */}
              <div>
                <label className="block text-gray-700">Caste Category</label>
                <select name="casteCategory" value={profileData.casteCategory} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="">Select Caste Category</option>
                  <option value="General">General</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                </select>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-gray-700">Religion</label>
                <select name="religion" value={profileData.religion} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-gray-700">State</label>
                <select name="state" value={profileData.state} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>

              {/* Documents Upload */}
              <div>
                <label className="block text-gray-700 mb-1">Upload Documents (e.g., Aadhaar, Ration Card)</label>
                <input type="file" multiple onChange={handleDocumentChange} />
                <div className="mt-2 flex flex-wrap gap-2">
                  {profileData.documents.map((doc, index) => (
                    <div key={index} className="relative border p-1 rounded-md">
                      <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Document {index + 1}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(index)}
                        className="absolute top-0 right-0 text-red-600 font-bold px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetup;
