import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfileSetup from "./components/Profile/ProfileSetup";
import Schemes from "./pages/Schemes";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import SchemesList from "./pages/SchemesList";
import SchemesByCategory from "./components/SchemesByCategory";
import "./index.css";
import Admin from "./components/Admin/AdminDashboard";
import AddScheme from "./components/Admin/AddScheme";
import ManageSchemes from "./components/Admin/ManageSchemes";
import ManageUsers from "./components/Admin/ManageUsers";
import UserProfile from "./components/Profile/UserProfile";
import EditScheme from "./components/Admin/EditScheme";
import Chatbot from "./components/Grievances/Chatbot";
import AdminGrievances from "./components/Admin/AdminGrievances";
import GrievanceForm from "./components/Grievances/GrievanceForm";
import GrievancesPage from "./pages/GrievancesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RationCardCheck from "./components/Ration Card/RationCardCheck";
import AboutContactPage from "./pages/AboutContactPage";
import FAQSection from "./components/Grievances/FAQSection";
import CscCenters from "./components/Assisstance/csc/CscCenters";
import LeafletTest from "./components/LeafletTest";
import CommoditiesPage from "./components/Ration Card/CommoditiesPage";
import SchemesPage from "./components/Ration Card/SchemesPage";
import RationInfoPage from "./components/Ration Card/RationInfoPage";
import NoticeBoard from "./components/Assisstance/Notice";
import SchemePredictor from "./components/Assisstance/SchemePredictor";
import NGOCard from "./components/Assisstance/NGO";
import AssistanceHome from "./components/Assisstance/AssisstanceHome";
import AdminLogin from "./components/AdminLogin";
import WebsiteTour from "./components/WebsiteTour";
function App() {
  

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-profile" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/schemes/:categoryId" element={<SchemesList />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-scheme" element={<AddScheme />} />
          <Route path="/admin/manage-schemes" element={<ManageSchemes />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/details/:id" element={<UserProfile />} />
          <Route path="/edit-scheme/:id" element={<EditScheme />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/complaint" element={<GrievanceForm />} />
          <Route path="/grievance" element={<GrievancesPage />} />
          <Route path="/admin/grievances" element={<AdminGrievances />} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/rationcard" element={<RationCardCheck />} />
          <Route path="/about" element={<AboutContactPage />} />
          <Route path="/faq" element={<FAQSection/>} />
          <Route path="/csc" element={<CscCenters/>} />
          <Route path="/map" element={<LeafletTest/>} />
          <Route path="/commodities/:state" element={<CommoditiesPage />} />
          {/*<Route path="/rationschemes/:cardType" element={<SchemesPage />} />*/}
          <Route path="/rationschemes" element={<SchemesPage />} />
          <Route path="/rationinfo" element={<RationInfoPage />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/predict" element={<SchemePredictor />} />
          <Route path="/ngo" element={<NGOCard/>} />
          <Route path="/assisst" element={<AssistanceHome/>} />
          <Route path="/tour" element={<WebsiteTour/>} />
          <Route path="/schemes/category/:categoryId" element={<SchemesByCategory/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
