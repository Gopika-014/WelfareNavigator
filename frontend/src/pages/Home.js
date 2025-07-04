import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IoHeartOutline, IoSchoolOutline, IoBriefcaseOutline,
  IoWomanOutline, IoLeafOutline, IoHomeOutline,
  IoBusinessOutline, IoPeopleOutline,
} from "react-icons/io5";
import {
  FaSearch, FaMapMarkerAlt, FaQuestionCircle,
  FaListAlt, FaTachometerAlt, FaArrowLeft, FaArrowRight
} from "react-icons/fa";

import Header from "../components/Header";

// Category icon mapping
const iconMapping = {
  "Health & Welfare": <IoHeartOutline className="text-blue-600 text-5xl" />,
  "Agriculture & Rural": <IoLeafOutline className="text-green-700 text-5xl" />,
  "Education & Scholarships": <IoSchoolOutline className="text-green-600 text-5xl" />,
  "Employment & Skill Development": <IoBriefcaseOutline className="text-yellow-600 text-5xl" />,
  "Women & Child Development": <IoWomanOutline className="text-pink-600 text-5xl" />,
  "Housing & Urban Development": <IoHomeOutline className="text-gray-600 text-5xl" />,
  "Transport": <IoBusinessOutline className="text-purple-600 text-5xl" />,
  "Senior Citizen & Disabled": <IoPeopleOutline className="text-orange-600 text-5xl" />,
};

// Banner Slides
const bannerSlides = [
  {
    title: "Need help applying for schemes?",
    content: "Feeling unsure about the application process? CitizenAid connects you with trusted NGOs and support volunteers who provide step-by-step guidance to help you apply for the right government schemes with ease.",
    buttonText: "Get Assistance",
    link: "/ngo",
  },
  {
    title: "Find nearby CSC Centers",
    content: "Get directions to the nearest Common Service Center for in-person assistance with applications.",
    buttonText: "Locate CSC",
    link: "/csc",
  },
  {
    title: "Not sure what you're eligible for?",
    content: "Upload your documents or answer a few questions and let us recommend the right schemes.",
    buttonText: "Check Eligibility",
    link: "/predict",
  },
  {
    title: "Confused about where to begin?",
    content: "Take a short tour of the platform to understand how CitizenAid empowers you.",
    buttonText: "Take the Tour",
    link: "/tour",
  },
];

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState("explore");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/auth/categories")
      .then(({ data }) => setCategories(data))
      .catch(error => console.error("Error fetching categories", error));
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };
 // console.log(categories);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Content Layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-72 hidden md:flex flex-col gap-6 bg-white shadow-xl p-6 fixed left-0 top-0 h-screen border-r border-gray-200 mt-20 z-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
          {[
            { key: "explore", label: "Explore Schemes", icon: <FaSearch />, path: "/schemes" },
            { key: "grievances", label: "Grievances", icon: <FaListAlt />, path: "/grievance" },
            { key: "assistance", label: "Assistance", icon: <FaMapMarkerAlt />, path: "/assisst" },
            { key: "tour", label: "Website Tour", icon: <FaQuestionCircle />, path: "/tour" },
            { key: "admin", label: "Admin Dashboard", icon: <FaTachometerAlt />, path: "/admin-login" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveSection(item.key);
                navigate(item.path);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-grow md:ml-72 p-6 pb-24">
          {/* Hero Section */}
          <section className="text-center py-16 px-6 mt-20 bg-blue-50 shadow-inner rounded-3xl mb-12">
            <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to CitizenAid</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-6">
              Discover and apply for government schemes tailored to your needs. Empowering every citizen with access to their rights.
            </p>
            <button
              onClick={() => navigate("/predict")}
              className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-600 transition flex items-center gap-3 mx-auto shadow-md"
            >
              <FaSearch /> Find Schemes For You
            </button>
          </section>

          {/* Sliding Banner Section */}
          <section className="relative bg-blue-50 rounded-3xl shadow-lg p-6 md:p-10 mb-16 border border-gray-200 overflow-hidden">
            <div className="relative flex items-center justify-between w-full">
              {/* Arrow Left */}
              <button
                onClick={prevSlide}
                className="text-blue-600 hover:text-white hover:bg-blue-600 p-3 rounded-full transition shadow"
              >
                <FaArrowLeft size={20} />
              </button>

              {/* Slide Content */}
              <div className="flex-1 px-6 md:px-12 text-center md:text-left transition-all duration-500 ease-in-out">
                <h2 className="text-3xl font-bold text-blue-800 mb-3">
                  {bannerSlides[activeSlide].title}
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-8">{bannerSlides[activeSlide].content}</p>
                <button
                  onClick={() => navigate(bannerSlides[activeSlide].link)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow"
                >
                  {bannerSlides[activeSlide].buttonText}
                </button>
              </div>

              {/* Arrow Right */}
              <button
                onClick={nextSlide}
                className="text-blue-600 hover:text-white hover:bg-blue-600 p-3 rounded-full transition shadow"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </section>

          {/* Explore Schemes by Sector */}
          <section className="py-16 px-4 md:px-6 bg-blue-50 shadow-inner rounded-3xl mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Explore Schemes by Sector</h2>
              <p className="text-gray-500 mt-2">Choose a sector to find relevant schemes for you</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div
                key={category.id}
                onClick={() => navigate(`/schemes/category/${category.id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-blue-400 min-h-[200px] flex flex-col justify-center items-center"
              >
                <div className="mb-4">
                  {iconMapping[category.name] || <IoBriefcaseOutline className="text-blue-500 text-5xl" />}
                </div>
                <h3 className="text-lg text-center font-semibold text-gray-800 ">{category.name}</h3>
              </div>
              
              ))}
            </div>
          </section>
        </main>
      </div>

     
    </div>
  );
};

export default Home;
