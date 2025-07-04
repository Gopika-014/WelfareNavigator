import React, { useState } from "react";
import { useSelector } from "react-redux";
import GrievanceForm from "../components/Grievances/GrievanceForm";
import GrievanceList from "../components/Grievances/GrievanceList";
import Chatbot from "../components/Grievances/Chatbot";
import FAQSection from "../components/Grievances/FAQSection";
import Header from "../components/Header";
import { FaPlusCircle, FaQuestionCircle, FaListAlt } from "react-icons/fa";

const GrievancesPage = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user._id : null;
  const [activeSection, setActiveSection] = useState("submit");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header/>

      {/* Page Layout: Sidebar + Content */}
      <div className="flex flex-grow container mx-auto pt-20 px-4 py-6">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="w-1/4 hidden md:flex flex-col gap-3 border-r border-gray-300 pr-4">
          <h3 className="text-lg font-semibold mb-2">Grievance Portal</h3>
          {[
            { key: "submit", label: "Submit Grievance", icon: <FaPlusCircle /> },
            
            { key: "grievances", label: "My Grievances", icon: <FaListAlt /> },
          ].map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border ${
                activeSection === item.key
                  ? "border-blue-500 bg-blue-100 font-semibold text-blue-600"
                  : "border-transparent hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Mobile Sidebar (Top Menu) */}
        <div className="md:hidden flex justify-around border-b border-gray-300 py-3 mb-4">
          {[
            { key: "submit", label: "Submit", icon: <FaPlusCircle /> },
        
            { key: "grievances", label: "My Grievances", icon: <FaListAlt /> },
          ].map((item) => (
            <button
              key={item.key}
              className={`flex flex-col items-center text-sm transition-all duration-300 ${
                activeSection === item.key
                  ? "text-blue-600 font-semibold border-b-2 border-blue-500"
                  : "hover:text-gray-500"
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-grow bg-white p-6 rounded-lg shadow-lg border">
          {userId ? (
            <>
              {activeSection === "submit" && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">Submit a Grievance</h2>
                  <GrievanceForm userId={userId} />
                </>
              )}
             
              {activeSection === "grievances" && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Submitted Grievances</h2>
                  <GrievanceList userId={userId} />
                </>
              )}
            </>
          ) : (
            <p className="text-center text-red-500 text-xl">Please log in to view and submit grievances.</p>
          )}
        </main>
      </div>
      <Chatbot/>
    </div>
  );
};

export default GrievancesPage;
