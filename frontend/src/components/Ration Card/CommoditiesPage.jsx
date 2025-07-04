import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommoditiesPage = () => {
  const { state } = useParams();
  const stateName = decodeURIComponent(state);
  const [commodities, setCommodities] = useState([]);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/fetch", {
          state: stateName,
        });
        setCommodities(response.data);
        console.log("Commodities:", response.data);
      } catch (error) {
        console.error("Error fetching commodities:", error);
        setCommodities([]);
      }
    };

    if (stateName) fetchCommodities();
  }, [stateName]);

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Commodities Distribution in {stateName}
      </h1>

      {commodities.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white text-sm text-left border border-gray-200">
            <thead className="bg-blue-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Commodity Name</th>
                <th className="px-6 py-3">Scale of Supply</th>
                <th className="px-6 py-3">Price (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {commodities.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition duration-200">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">{item.scaleOfSupply}</td>
                  <td className="px-6 py-4 text-gray-700">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-red-600 text-center mt-10">
          No commodities found for {stateName}.
        </p>
      )}
    </div>
  );
};

export default CommoditiesPage;
