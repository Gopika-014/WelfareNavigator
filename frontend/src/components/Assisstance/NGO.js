import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Header from "../Header"
const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/ngo');
        console.log("NGO data:", res.data.data);
        setNgos(res.data.data);
      } catch (err) {
        console.error('Failed to fetch NGOs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <Header/>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-24 text-center text-blue-800">
        NGOs Helping You Apply for Government Schemes
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading NGOs...</p>
      ) : ngos.length === 0 ? (
        <p className="text-center text-red-500">No NGOs found.</p>
      ) : (
        ngos.map((ngo) => (
          <div
            key={ngo._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">{ngo.name}</h2>

            <p className="text-gray-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              {ngo.address}
            </p>

            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
              <p>
                <span className="font-semibold">Sector:</span> {ngo.sector}
              </p>
              <p>
                <span className="font-semibold">Languages:</span> {ngo.languages.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Availability:</span> {ngo.availability}
              </p>
              <div>
                <span className="font-semibold">Support Offered:</span>
                <ul className="list-disc list-inside">
                  {ngo.support.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 items-center mt-4">
              {ngo.phone && (
                <a
                  href={`tel:${ngo.phone}`}
                  title="Call"
                  className="text-green-600 hover:text-green-800 text-xl"
                >
                  <FaPhoneAlt />
                </a>
              )}

              {ngo.email && (
                <a
                  href={`mailto:${ngo.email}`}
                  title="Email"
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaEnvelope />
                </a>
              )}

              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NGOList;
