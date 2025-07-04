import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaTasks, FaEnvelope, FaUsers, FaCog ,FaArrowLeft} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
      <Link to="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaArrowLeft /> <span>Home</span>
        </Link>
        <Link to="/admin" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaHome /> <span>Dashboard</span>
        </Link>
        <Link to="/admin/add-scheme" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaPlus /> <span>Add Scheme</span>
        </Link>
        <Link to="/admin/manage-schemes" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaTasks /> <span>Manage Schemes</span>
        </Link>
        <Link to="/admin/grievances" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaEnvelope /> <span>Grievances</span>
        </Link>
        <Link to="/admin/users" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaUsers /> <span>User Management</span>
        </Link>
        {/*<Link to="/admin/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <FaCog /> <span>Settings</span>
        </Link>*/}
      </nav>
    </div>
  );
};

export default Sidebar;
