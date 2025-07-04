import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaHome, FaSearch, FaClipboardList, FaComments, FaUserEdit, FaSignOutAlt, FaBell, FaExclamationCircle } from "react-icons/fa";
import Header from "../components/Header";
import { logout } from "../redux/authSlice";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8000/api/auth/details/${userId}`)
        .then((res) => setUserDetails(res.data))
        .catch((err) => {
          console.error("Error fetching user details:", err);
          alert("Failed to fetch user details");
        });
     
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const calculateProfileCompletion = () => {
    if (!userDetails?.profile) return 0;
    const fields = ["incomeLevel", "education", "occupation", "gender", "profilePicture"];
    const filled = fields.filter((field) => userDetails.profile[field]);
    return Math.round((filled.length / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="w-full mt-20 p-10 space-y-10">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userDetails?.name || "User"} 👋
          </h1>
          <p className="text-gray-600 mt-1">Here’s what’s happening with your account.</p>
        </div>

        {/* Profile Completion Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 transition-all"
              style={{ width: `${calculateProfileCompletion()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {calculateProfileCompletion()}% completed
          </p>
          {calculateProfileCompletion() < 100 && (
            <Link to="/update-profile" className="text-blue-600 hover:underline mt-2 inline-block">
              Complete Profile Setup
            </Link>
          )}
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Explore Schemes Card */}
          <div className="bg-violet-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaSearch className="text-gray-800" /> Explore Schemes
            </h3>
            <p className="text-gray-600">Find schemes that best match your profile.</p>
            <Link to="/schemes" className="text-blue-600 hover:text-blue-800 font-medium underline mt-2 inline-block">
              View Schemes
            </Link>
          </div>

          {/* Check Eligibility Card */}
          <div className="bg-yellow-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaClipboardList className="text-gray-800" /> Check Eligibility
            </h3>
            <p className="text-gray-600">Get AI-based recommendations in one click.</p>
            <Link
              to="/predict"
              state={{ userDetails }}
              className="text-blue-600 hover:text-blue-800 font-medium underline mt-2 inline-block"
            >
              Start Check
            </Link>
          </div>

          {/* Grievance Card */}
          <div className="bg-pink-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaExclamationCircle className="text-gray-800" /> Raise Grievances
            </h3>
            <p className="text-gray-600">Need help? Let us know your concerns.</p>
            <Link to="/grievance" className="text-blue-600 hover:text-blue-800 font-medium underline mt-2 inline-block">
              Submit Query
            </Link>
          </div>

          {/* Notices Card */}
          <div className="bg-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaBell className="text-gray-800" /> Latest Notices
            </h3>
            <p className="text-gray-600">Click here to check recent updates and notices.</p>
            <Link
              to="/notice"
              className="text-blue-600 hover:text-blue-800 font-medium underline mt-2 inline-block"
            >
              View Notices
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaUserAlt className="text-gray-800" /> Your Profile
            </h3>
            <p className="text-gray-600">View and edit your profile information.</p>
            <Link
              to={`/details/${user._id}`}
              className="text-blue-600 hover:text-blue-800 font-medium underline mt-2 inline-block"
            >
              View Profile
            </Link>
          </div>

          {/* Logout Card */}
          <div className="bg-orange-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FaSignOutAlt className="text-gray-800" /> Logout
            </h3>
            <p className="text-gray-600">Logout from your account.</p>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium underline mt-2 inline-block"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
