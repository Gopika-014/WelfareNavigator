import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import {
   FaArrowLeft
} from 'react-icons/fa';
const SchemesPage = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [selectedCardType, setSelectedCardType] = useState('all');
  const [selectedSchemeType, setSelectedSchemeType] = useState('all');

  const fetchSchemes = (filters = {}) => {
    axios
      .post('http://localhost:8000/api/schemes/fetch', filters)
      .then(res => setSchemes(res.data))
      .catch(err => console.error("Error fetching schemes:", err));
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filter = {};
    if (selectedCardType !== 'all') {
      filter.cardType = selectedCardType.toUpperCase();
    }
    if (selectedSchemeType !== 'all') {
      filter.schemeType = selectedSchemeType.toLowerCase();
    }
    fetchSchemes(filter);
  };

  const handleClearFilters = () => {
    setSelectedCardType('all');
    setSelectedSchemeType('all');
    fetchSchemes();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Layout */}
      <div className="flex pt-24 pl-72 pr-6">

        {/* Sidebar */}
        <aside className="w-64 h-screen fixed mt-20 top-0 left-0 bg-white shadow-lg p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Filter Schemes</h2>
          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ration Card Type</label>
              <select
                value={selectedCardType}
                onChange={(e) => setSelectedCardType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="all">All</option>
                <option value="PHH">PHH</option>
                <option value="AAY">AAY</option>
                <option value="BPL">BPL</option>
                <option value="APL">APL</option>
                <option value="NPHH">NPHH</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Scheme Type</label>
              <select
                value={selectedSchemeType}
                onChange={(e) => setSelectedSchemeType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="all">All</option>
                <option value="central">Central</option>
                <option value="state">State</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full"
              >
                Clear
              </button>
            </div>
          </form>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Back Button */}
          <div className="mb-4">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition"
                    >
                      <FaArrowLeft /> Back
                    </button>
                  </div>
          <h1 className="text-2xl font-bold mb-6">
            {selectedSchemeType !== 'all' ? `${selectedSchemeType.charAt(0).toUpperCase() + selectedSchemeType.slice(1)} ` : ''}
            Schemes for Ration Card Type: {selectedCardType}
          </h1>

          {schemes.length === 0 ? (
            <p>No schemes found for the selected filters.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-blue-600 text-white text-sm uppercase">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Scheme Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Benefits</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Sub-schemes</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">{scheme.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{scheme.objective}</td>
                      <td className="border border-gray-300 px-4 py-2">{scheme.benefits}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {scheme.components?.length > 0 ? (
                          <ul className="list-disc ml-4 text-sm">
                            {scheme.components.map((comp, i) => (
                              <li key={i}><strong>{comp.name}</strong>: {comp.benefit}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500 italic">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SchemesPage;
