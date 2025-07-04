import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import axios from "axios";
import Sidebar from "./Sidebar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("reached fetch users");
        const response = await axios.get("http://localhost:8000/api/auth/details");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 p-6 bg-white overflow-auto flex">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.profileLink}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border space-x-2">
              {console.log("User ID:", user.profileLink)} {/* Log the user ID */}
                <Link
                  to={`/details/${user.profileLink}`}
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(user.profileLink)}
                >

                  Delete
                </button>
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => handleMessage(user.email)}
                >
                  Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

// Function to delete a user
const handleDelete = async (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await axios.delete(`http://localhost:8000/api/auth/delete/${userId}`);
      window.location.reload(); // Reload page after deleting
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// Function to message a user 
const handleMessage = (email) => {
  window.location.href = `mailto:${email}`;
};




export default ManageUsers;
