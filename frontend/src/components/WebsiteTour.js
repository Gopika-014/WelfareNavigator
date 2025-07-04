import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaIdCard, FaListAlt, FaSearchLocation, FaBullhorn, FaRobot, FaQuestionCircle, FaCommentDots } from "react-icons/fa";
import Header from "./Header";
const tourSteps = [
  {
    question: "How do I join CitizenAid?",
    answer: "Register using your basic details like full name, Aadhaar number, mobile number, email, and set a password. Quick and secure!",
    icon: <FaUserPlus className="text-blue-700 text-3xl" />,
    link: "/register",
    button: "Register Now",
  },
  {
    question: "How do I log in to my dashboard?",
    answer: "Log in easily using your registered email address and password. Access your personalized dashboard in seconds.",
    icon: <FaSignInAlt className="text-blue-700 text-3xl" />,
    link: "/login",
    button: "Login",
  },
  {
    question: "What schemes do I get with my ration card?",
    answer: "Select your ration card type (PHH, AAY, NPHH, etc.) to view eligible schemes based on your card category and your state.",
    icon: <FaIdCard className="text-blue-700 text-3xl" />,
    link: "/rationcard",
    button: "Check Ration Card Based Schemes",
  },
  {
    question: "Can I explore schemes by category or type?",
    answer: "Yes! Discover Central and State government schemes sorted by sectors like Education, Health, Women, Employment, and more.",
    icon: <FaListAlt className="text-blue-700 text-3xl" />,
    link: "/schemes",
    button: "Explore Schemes",
  },
  {
    question: "Where can I find nearby help centers?",
    answer: "Locate nearby CSCs, NGOs, or local government assistance centers using your district or city details.",
    icon: <FaSearchLocation className="text-blue-700 text-3xl" />,
    link: "/csc",
    button: "Find Help",
  },
  {
    question: "How do I get updates about new schemes?",
    answer: "Our notices section keeps you updated with the latest scheme announcements, changes, and deadlines.",
    icon: <FaBullhorn className="text-blue-700 text-3xl" />,
    link: "/notice",
    button: "View Notices",
  },
  {
    question: "Can CitizenAid predict schemes for me?",
    answer: "Yes! Our smart engine uses your profile to suggest the most suitable schemes you're eligible for.",
    icon: <FaRobot className="text-blue-700 text-3xl" />,
    link: "/predict",
    button: "Try Predictions",
  },
  {
    question: "Where can I report issues or submit queries?",
    answer: "Facing any issue? Raise a grievance or submit a query through our user-friendly Grievance Portal.",
    icon: <FaCommentDots className="text-blue-700 text-3xl" />,
    link: "/grievance",
    button: "Submit Grievance",
  },
  {
    question: "Still have questions?",
    answer: "Visit our FAQs section to get answers to commonly asked questions about registration, eligibility, and usage.",
    icon: <FaQuestionCircle className="text-blue-700 text-3xl" />,
    link: "/faq",
    button: "View FAQs",
  },
];

const Tour = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 px-4 md:px-12">
      <Header/>
      {/* Hero Header */}
      <div className="text-center mt-8 mb-16">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">CitizenAid Website Tour</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Navigate through the key features of CitizenAid and get started with accessing government benefits faster and smarter.
        </p>
      </div>

      {/* Steps Section */}
      <div className="space-y-12">
        {tourSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Icon */}
            <div className="flex-shrink-0 p-4 bg-blue-100 rounded-full shadow-md">
              {step.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{step.question}</h2>
              <p className="text-gray-600 text-lg">{step.answer}</p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(step.link)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition duration-300"
            >
              {step.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tour;
