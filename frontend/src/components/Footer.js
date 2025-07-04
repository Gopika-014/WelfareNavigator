import React from "react";
import { FaFileAlt, FaGraduationCap, FaIdCard, FaBook, FaGlobe, FaPills, FaMobile } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 w-full fixed bottom-0">
      <div className="container mx-auto flex flex-wrap justify-center gap-8 px-6">
        <a href="https://digilocker.gov.in/" className="flex items-center gap-2">
          <FaFileAlt className="text-blue-500" /> DigiLocker
        </a>
        <a href="https://scholarships.gov.in/" className="flex items-center gap-2">
          <FaGraduationCap className="text-red-500" /> Scholarship Portal
        </a>
        <a href="https://uidai.gov.in/" className="flex items-center gap-2">
          <FaIdCard className="text-yellow-500" /> Aadhaar Services
        </a>
        <a href="https://pmindia.gov.in/en/pmevidya/" className="flex items-center gap-2">
          <FaBook className="text-pink-500" /> PM eVidya
        </a>
        <a href="https://www.mygov.in/" className="flex items-center gap-2">
          <FaGlobe className="text-green-500" /> MyGov
        </a>
        <a href="https://janaushadhi.gov.in/" className="flex items-center gap-2">
          <FaPills className="text-green-500" /> Janaushadhi
        </a>
        <a href="https://web.umang.gov.in/" className="flex items-center gap-2">
          <FaMobile className="text-purple-500" /> UMANG App
        </a>
      </div>
    </footer>
  );
};

export default Footer;