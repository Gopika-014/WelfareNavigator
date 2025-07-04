import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import Header from "../Header";

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // All FAQ Questions Categorized
  const faqs = [
    {
      category: "Grievance Related Questions",
      questions: [
        { q: "How do I submit a grievance?", a: "Go to the 'Submit Grievance' section, fill in the details, and click submit." },
        { q: "Can I track my grievance status?", a: "Yes, you can track the status in the 'My Grievances' section." },
        { q: "How long does it take to resolve a grievance?", a: "Resolution time varies, but you will receive updates via email and dashboard notifications." },
        { q: "What should I do if my grievance is not resolved?", a: "You can escalate the grievance by providing additional details in the grievance follow-up section." },
      ],
    },
    {
      category: "Common Queries (Account, Login, Email)",
      questions: [
        { q: "How do I register on the platform?", a: "Click on 'Register', fill in the required details." },
        { q: "What should I do if I forgot my password?", a: "Click 'Forgot Password', enter your email, and follow the reset instructions sent to your email." },
        { q: "Can I change my registered email?", a: "No, email addresses cannot be changed after registration for security reasons." },
      ],
    },
    {
      category: "Eligibility Related Questions",
      questions: [
        { q: "How can I check my eligibility for government schemes?", a: "Use our 'Eligibility Checker' to enter your details and find suitable schemes." },
        { q: "What factors determine my eligibility?", a: "Eligibility is based on factors like income, age, gender, location, and socio-economic status." },
        { q: "Do I need to upload any documents for eligibility check?", a: "No, you only need to enter basic details. However, documents are required while applying for schemes." },
      ],
    },
    {
      category: "Scheme Search & Filters",
      questions: [
        { q: "How can I search for schemes?", a: "Use the 'Explore Schemes' section and apply filters like age, gender, state, category, etc." },
        { q: "Can I filter schemes based on my state?", a: "Yes, you can filter schemes based on your state and region." },
        { q: "Are both state and central government schemes available?", a: "Yes, our platform includes both central and state government schemes." },
      ],
    },
  ];

  // Filtering questions based on search input
  const filteredFAQs = faqs.map((section) => ({
    ...section,
    questions: section.questions.filter((q) =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="w-full">
      <Header/>
      {/* Search Bar */}
      <div className="relative mb-4 mt-20">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ Sections */}
      {filteredFAQs.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b pb-2">{section.category}</h2>
          {section.questions.length > 0 ? (
            section.questions.map((faq, i) => (
              <div key={i} className="mb-2">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200"
                  onClick={() => toggleQuestion(`${index}-${i}`)}
                >
                  {faq.q}
                  {openQuestion === `${index}-${i}` ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openQuestion === `${index}-${i}` && (
                  <p className="p-4 border-l-4 border-blue-500 bg-gray-50">{faq.a}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No matching results.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
