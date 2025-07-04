import React, { useEffect, useState } from 'react';

const InfoPopup = ({ purposeText }) => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Auto-close after 10 seconds (optional)
    // setTimeout(() => setShowPopup(false), 10000);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-white via-gray-100 to-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative border border-gray-200 animate-fade-in-up">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-transform hover:scale-110"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Welcome to CitizenAid!
        </h2>
        <p className="text-gray-700 text-md text-center leading-relaxed">
          {purposeText}
        </p>
      </div>
    </div>
  );
};

export default InfoPopup;
