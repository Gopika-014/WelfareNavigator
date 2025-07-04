import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaHandsHelping, FaLightbulb, FaBell } from 'react-icons/fa';
import Header from "../Header"
const AssistanceHome = () => {
  const assistanceOptions = [
    {
      title: 'CSC Centers',
      description: 'Find nearby Common Service Centers for help with scheme applications.',
      icon: <FaMapMarkerAlt className="text-blue-700 text-3xl" />,
      link: '/csc',
    },
    {
      title: 'NGOs Offering Help',
      description: 'Explore NGOs that assist citizens in applying for government schemes.',
      icon: <FaHandsHelping className="text-blue-700 text-3xl" />,
      link: '/ngo',
    },
    {
      title: 'Scheme Prediction Tool',
      description: 'Discover which schemes you’re eligible for using our AI-based tool.',
      icon: <FaLightbulb className="text-blue-700 text-3xl" />,
      link: '/predict',
    },
    {
      title: 'Latest Notices',
      description: 'Stay updated with the latest government scheme notices and deadlines.',
      icon: <FaBell className="text-blue-700 text-3xl" />,
      link: '/notice',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <Header/>
      <h1 className="text-4xl font-bold text-center text-blue-800  mt-20 mb-6">
        Assistance & Support Hub
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Your one-stop destination for help in applying for government schemes, finding local support centers, and accessing scheme-related resources.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {assistanceOptions.map((opt, index) => (
          <Link
            to={opt.link}
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              {opt.icon}
              <h2 className="text-xl font-semibold text-blue-700">{opt.title}</h2>
            </div>
            <p className="text-gray-600 text-sm">{opt.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AssistanceHome;
