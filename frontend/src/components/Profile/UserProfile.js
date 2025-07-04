import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams(); // The profile being viewed
  console.log("Id in profile section:",id);
  const { user: loggedInUser } = useSelector((state) => state.auth); // Logged-in user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/details/${id}`);
        console.log("User profile data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-600 text-lg font-semibold">Loading...</p>;
  if (!user)
    return <p className="text-center text-red-500 text-lg font-semibold">User not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {user?.name}'s Profile
      </h1>

      {/* Profile Picture */}
      <div className="flex justify-center">
        {user?.profile?.profilePicture ? (
          <img
            src={user.profile.profilePicture}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Photo</p>
          </div>
        )}
      </div>

      {/* User Details */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-lg">
            <strong className="text-gray-700">Email:</strong>{" "}
            <span className="text-gray-600">{user?.email || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Phone:</strong>{" "}
            <span className="text-gray-600">{user?.phone || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Gender:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.gender || "Not specified"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Date of Birth:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.dob || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Address:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.address || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Occupation:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.occupation || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Income Level:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.incomeLevel || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Family Size:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.familySize || "Not provided"}</span>
          </p>
          <p className="text-lg">
            <strong className="text-gray-700">Documents Required:</strong>{" "}
            <span className="text-gray-600">{user?.profile?.documents || "Not specified"}</span>
          </p>
        </div>
      </div>

      {/* Uploaded Documents */}
      {user?.profile?.documents && user.profile.documents.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Uploaded Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.profile.documents.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                {doc.endsWith(".pdf") ? (
                  <iframe
                    src={doc}
                    width="100%"
                    height="250px"
                    className="border-b border-gray-300"
                    title={`Document ${index + 1}`}
                  ></iframe>
                ) : (
                  <img src={doc} alt={`Document ${index + 1}`} className="w-full h-48 object-cover" />
                )}
                <div className="p-3 text-center bg-gray-100">
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View Full Document {index + 1}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Button (Only for the logged-in user) */}
      {loggedInUser?._id === id && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/update-profile"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
