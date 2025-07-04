import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-6 py-12 mt-20 flex-grow">
        {/* About Us Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-14 px-8 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide">About Us</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            <span className="font-semibold">CitizenAid</span> is your go-to platform for discovering and applying to government schemes seamlessly. 
            We leverage AI-driven recommendations and real-time updates to ensure every eligible citizen can access the benefits they deserve.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white p-10 rounded-xl shadow-lg mt-12 max-w-3xl mx-auto border-t-4 border-blue-500">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Contact Us</h2>

          {/* Contact Information */}
          <div className="flex flex-col items-center text-gray-800 mb-8">
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-full shadow-md">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <p className="font-medium text-lg">citizenaidschemes@gmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>

    </div>
  );
};

export default AboutContactPage;
