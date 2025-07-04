import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const schemesData = {
    1: [
      {
        name: "Ayushman Bharat",
        eligibility: "Families with low income, as per SECC data.",
        application: "Apply via PMJAY website or Common Service Centers.",
        link: "https://pmjay.gov.in/",
      },
      {
        name: "Pradhan Mantri Matru Vandana Yojana",
        eligibility: "Pregnant women and lactating mothers (first child only).",
        application: "Apply at Anganwadi or online.",
        link: "https://pmmvy.wcd.gov.in/",
      },
      {
        name: "Rashtriya Swasthya Bima Yojana",
        eligibility: "BPL families and unorganized workers.",
        application: "Apply through State Nodal Agencies.",
        link: "https://labour.gov.in/rsby",
      },
      {
        name: "Mission Indradhanush",
        eligibility: "Children below 2 years and pregnant women.",
        application: "Vaccination at government health centers.",
        link: "https://nhm.gov.in/",
      },
    ],
    2: [
      {
        name: "National Scholarship Portal",
        eligibility: "Students from SC/ST/OBC/Minority backgrounds.",
        application: "Apply via NSP website.",
        link: "https://scholarships.gov.in/",
      },
      {
        name: "Pragati Scholarship",
        eligibility: "Girls studying in AICTE-approved institutions.",
        application: "Apply via NSP portal.",
        link: "https://www.aicte-india.org/",
      },
      {
        name: "Pre-Matric & Post-Matric Scholarships",
        eligibility: "SC/ST/OBC/Minority students.",
        application: "Apply on NSP website.",
        link: "https://scholarships.gov.in/",
      },
      {
        name: "INSPIRE Scholarship",
        eligibility: "Science students with top ranks in 12th boards.",
        application: "Apply via DST portal.",
        link: "http://www.online-inspire.gov.in/",
      },
    ],
    3: [
      {
        name: "PM Kaushal Vikas Yojana",
        eligibility: "Youth seeking skill training.",
        application: "Register on the official portal.",
        link: "https://www.pmkvyofficial.org/",
      },
      {
        name: "NAPS - Apprenticeship Scheme",
        eligibility: "Students and unemployed youth.",
        application: "Register on the apprenticeship portal.",
        link: "https://www.apprenticeshipindia.gov.in/",
      },
      {
        name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        eligibility: "Rural households willing to do manual work.",
        application: "Apply through Gram Panchayats.",
        link: "https://nrega.nic.in/",
      },
      {
        name: "Stand-Up India Scheme",
        eligibility: "SC/ST and women entrepreneurs.",
        application: "Apply through Stand-Up India portal.",
        link: "https://www.standupmitra.in/",
      },
    ],
  };
  

// Mapping category ID to name
const categoryNames = {
  1: "Health & Welfare",
  2: "Education & Scholarships",
  3: "Employment & Skill Development",
};

const SchemesList = () => {
  const { categoryId } = useParams();
  console.log("Selected categoryId:", categoryId); // Debugging
  const schemes = schemesData[categoryId] || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto my-10 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Schemes for {categoryNames[categoryId] || "Selected Sector"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.length > 0 ? (
            schemes.map((scheme, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                <p className="text-gray-700 mt-2"><strong>Eligibility:</strong> {scheme.eligibility}</p>
                <p className="text-gray-700 mt-2"><strong>Application:</strong> {scheme.application}</p>
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 block">
                  Apply Here
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SchemesList;
