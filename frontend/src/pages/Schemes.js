import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronDown, FaMicrophone } from "react-icons/fa";
import Header from "../components/Header";
import InfoPopup from "../components/InfoPopup";
import { Link } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const categories = [
  { id: 1, name: "Health & Welfare" },
  { id: 5, name: "Education & Scholarships" },
  { id: 3, name: "Employment & Skill Development" },
  { id: 4, name: "Women & Child Development" },
  { id: 2, name: "Agriculture & Rural" },
  { id: 6, name: "Housing & Urban Development" },
  { id: 7, name: "Transport" },
  { id: 8, name: "Senior Citizen & Disabled" },
];

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedScheme, setHighlightedScheme] = useState(null);
  const schemeRefs = useRef({});

  const handleSpeak = (scheme) => {
    const text = `
      Scheme Name: ${scheme.name}.
      Description: ${scheme.description}.
      Eligibility: ${scheme.eligibility || "Not specified"}.
      Benefits: ${scheme.benefits || "Not specified"}.
      Documents Required: ${scheme.documentsRequired?.join(", ") || "Not specified"}.
      Contact Details: ${scheme.contactDetails || "Not available"}.
    `;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let url = "http://localhost:8000/api/schemes";
    if (selectedFilter === "state" && selectedState) {
      url = `http://localhost:8000/api/schemes/state/${selectedState}`;
    } else if (selectedFilter === "central") {
      url = "http://localhost:8000/api/schemes/type/central";
    } else if (selectedFilter === "category" && selectedCategory) {
      url = `http://localhost:8000/api/schemes/category/${selectedCategory}`;
    } else if (selectedFilter === "state") {
      url = "http://localhost:8000/api/schemes/type/state";
    }

    axios.get(url)
      .then((res) => {
        setSchemes(res.data.schemes || res.data); // Handling the response for categories
        schemeRefs.current = {};
      })
      .catch(console.error);
  }, [selectedFilter, selectedState, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = schemes.filter((scheme) =>
        scheme.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setSearchQuery(spokenText);
      handleSearch(spokenText);
    };
  };

  const handleSelectScheme = (scheme) => {
    setSearchQuery("");
    setHighlightedScheme(scheme._id);
    setSuggestions([]);

    if (schemeRefs.current[scheme._id]) {
      schemeRefs.current[scheme._id].scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => setHighlightedScheme(null), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <InfoPopup purposeText="This page allows users to explore various government schemes, both central and state-specific. You can filter schemes based on type, state, or search for specific ones. Click on 'View Details' to get comprehensive info, and use the mic button to hear scheme descriptions via text-to-speech." />

      <Header />
      <main className="flex-grow flex bg-gray-100 mt-20">

        {/* Sidebar for Filters */}
        <aside className="w-1/5 bg-white shadow-md p-4 h-screen fixed">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter Schemes</h2>
          <select
            className="w-full p-2 border rounded-lg mb-3"
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value);
              setSelectedState("");
              setSelectedCategory("");
            }}
          >
            <option value="all">All Schemes</option>
            <option value="central">Central Schemes</option>
            <option value="state">State Schemes</option>
            <option value="category">By Category</option>
          </select>

          {selectedFilter === "state" && (
            <select
              className="w-full p-2 border rounded-lg mb-3"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select a State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          )}

          {selectedFilter === "category" && (
            <select
              className="w-full p-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          )}
          <Link to="/rationcard">
            <button className="w-full mt-4 p-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
              Click to View Ration Card Based Schemes
            </button>
          </Link>
        </aside>

        {/* Main Content */}
        <section className="w-4/5 p-6 ml-[20%]">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">Government Schemes</h1>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6 flex items-center">
            <input
              type="text"
              className="w-full p-2 border rounded-lg shadow-md"
              placeholder="Search for a scheme..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button onClick={handleVoiceSearch} className="absolute right-3 text-gray-600">
              <FaMicrophone size={20} />
            </button>
            {searchQuery && suggestions.length > 0 && (
              <ul className="absolute bg-white w-full shadow-md rounded-lg mt-1 z-10 max-h-40 overflow-y-auto">
                {suggestions.map((scheme) => (
                  <li
                    key={scheme._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectScheme(scheme)}
                  >
                    {scheme.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Schemes Table */}
          <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-cyan-600 text-white">
                <tr>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-left">Eligibility</th>
                  <th className="border p-3 text-left">Details</th>
                  <th className="border p-3 text-left">Read Aloud</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((scheme) => (
                  <SchemeRow
                    key={scheme._id}
                    scheme={scheme}
                    schemeRefs={schemeRefs}
                    isHighlighted={highlightedScheme === scheme._id}
                    onSpeak={handleSpeak}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// Collapsible SchemeRow Component
const SchemeRow = ({ scheme, schemeRefs, isHighlighted, onSpeak }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    schemeRefs.current[scheme._id] = rowRef.current;
  }, [scheme, schemeRefs]);

  return (
    <>
      <tr
        ref={rowRef}
        className={`border transition-colors duration-300 ${isHighlighted ? "bg-yellow-300" : "hover:bg-gray-100"}`}
      >
        <td className="border p-3">{scheme.name}</td>
        <td className="border p-3">{scheme.description}</td>
        <td className="border p-3">{scheme.eligibility || "N/A"}</td>
        <td className="border p-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center bg-cyan-600 text-white px-2 py-1 rounded-md"
          >
            View Details
            <FaChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </td>
        <td>
          {/* Mic Button for Text-to-Speech */}
          <button
            onClick={() => onSpeak(scheme)}
            className="flex items-center bg-cyan-600 text-white ml-6 px-2 py-1 rounded-md hover:bg-blue-700"
            title="Read Aloud"
          >
            <FaMicrophone />
          </button>
        </td>
      </tr>

      {isOpen && (
        <tr className="bg-gray-100">
          <td colSpan="5" className="p-4">
            <p><strong>Benefits:</strong> {scheme.benefits || "N/A"}</p>
            <p><strong>Documents Required:</strong> {scheme.documentsRequired?.join(", ") || "Not specified"}</p>
            <p><strong>Contact Details:</strong> {scheme.contactDetails || "N/A"}</p>
            <a
              href={scheme.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Apply Now
            </a>
          </td>
        </tr>
      )}
    </>
  );
};

export default Schemes;
