import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaBox, FaGift, FaFileAlt, FaBoxOpen, FaArrowLeft
} from 'react-icons/fa';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const states = [
  'Tamil Nadu', 'Kerala','Himachal Pradesh','Jharkhand','Tripura','Assam','Puducherry'
];

const RationInfoPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [data, setData] = useState({ commodities: null, gifts: [], schemes: [] });
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('commodities');

  const navigate = useNavigate();

  const fetchRationInfo = async (state) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/state/${state}`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch ration info', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedState) {
      fetchRationInfo(selectedState);
    }
  }, [selectedState]);

  const sections = [
    { key: 'commodities', label: 'Commodities', icon: <FaBox /> },
    { key: 'gifts', label: 'Special Gifts', icon: <FaGift /> },
    { key: 'schemes', label: 'Schemes', icon: <FaFileAlt /> },
  ];

  const NoDataMessage = ({ label }) => {
    let Icon;
    if (label === 'commodities') Icon = <FaBoxOpen className="text-3xl text-gray-400 mb-2" />;
    if (label === 'special gifts') Icon = <FaGift className="text-3xl text-gray-400 mb-2" />;
    if (label === 'schemes') Icon = <FaFileAlt className="text-3xl text-gray-400 mb-2" />;

    return (
      <div className="flex flex-col items-center justify-center text-gray-600 p-6 bg-gray-50 rounded-xl border border-gray-200">
        {Icon}
        <p className="text-md font-medium">No {label} found for this state.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-grow container mx-auto pt-20 px-4 py-6">
        {/* Sidebar */}
        <aside className="w-1/4 hidden md:flex flex-col gap-3 border-r border-gray-300 pr-4">
          <h3 className="text-lg font-semibold mb-2">Ration Info</h3>
          {sections.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition ${
                activeSection === item.key
                  ? 'border-blue-500 bg-blue-100 font-semibold text-blue-600'
                  : 'border-transparent hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Mobile Tabs */}
        <div className="md:hidden flex justify-around border-b border-gray-300 py-3 mb-4 w-full">
          {sections.map((item) => (
            <button
              key={item.key}
              className={`flex flex-col items-center text-sm ${
                activeSection === item.key
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-500'
                  : 'hover:text-gray-500'
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-grow bg-white p-6 rounded-lg shadow-lg border">
          {/* Back Button */}
          <div className="mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Ration Info by State</h1>

          {/* State Selector */}
          <div className="mb-6">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select a State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {loading && <p className="text-center text-blue-500">Loading data...</p>}

          {!loading && selectedState && (
            <>
              {/* Commodities */}
              {activeSection === 'commodities' && (
                <>
                  {data.commodities && data.commodities.commodities.length > 0 ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Commodities</h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-sm text-left border border-gray-200">
                          <thead className="bg-blue-600 text-white text-sm uppercase">
                            <tr>
                              <th className="px-4 py-2">Name</th>
                              <th className="px-4 py-2">Card Type</th>
                              <th className="px-4 py-2">Scale of Supply</th>
                              <th className="px-4 py-2">Price (₹)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {data.commodities.commodities.map((item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.cardType}</td>
                                <td className="px-4 py-2">{item.scaleOfSupply}</td>
                                <td className="px-4 py-2">₹{item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage label="commodities" />
                  )}
                </>
              )}

              {/* Gifts */}
              {activeSection === 'gifts' && (
                <>
                  {data.gifts.length > 0 ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Special Gifts</h2>
                      <div className="grid gap-4">
                        {data.gifts.map((gift, idx) => (
                          <div key={idx} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold text-green-800 mb-1 flex items-center gap-2 ">
                            <FaGift />{gift.giftName}
                           </h3>
                            <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                               Card Types: <span>{gift.cardType.join(', ')}</span>
                            </div>
                            <p className="text-gray-700 mb-2">Year: <span className="font-semibold">{gift.year}</span></p>
                            <ul className="list-disc list-inside text-gray-800">
                              {gift.giftItems.map((item, i) => (
                                <li key={i}>
                                  <strong>{item.name}</strong> ({item.quantity}) – {item.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage label="special gifts" />
                  )}
                </>
              )}

              {/* Schemes */}
              {activeSection === 'schemes' && (
                <>
                  {data.schemes.length > 0 ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Schemes Available</h2>
                      <div className="grid gap-4">
                        {data.schemes.map((scheme, idx) => (
                          <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                              <FaFileAlt /> {scheme.name}
                            </div>
                            <p><strong>Objective:</strong> {scheme.objective}</p>
                            <p><strong>Benefits:</strong> {scheme.benefits}</p>
                            <p><strong>Eligible Cards:</strong> {scheme.eligibleCardTypes.join(', ')}</p>
                            {scheme.applyLink && (
                              <p className="mt-2">
                                <a href={scheme.applyLink} className="text-blue-700 underline hover:text-blue-900" target="_blank" rel="noreferrer">
                                  Apply Here
                                </a>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage label="schemes" />
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default RationInfoPage;
