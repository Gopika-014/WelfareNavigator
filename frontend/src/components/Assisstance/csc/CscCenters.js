import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "./MapView"; // Adjust this path if needed
import InfoPopup from "../../InfoPopup"; // Adjust this path if needed
import Header from "../../Header";
const CscCenters = () => {
  const [data, setData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [showNearby, setShowNearby] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ district: "", city: "", taluk: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    if (showNearby) {
      fetchNearbyCscData();
    } else {
      fetchCscData();
    }
  }, [filters, page, showNearby]);

  const fetchFilters = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/csc-filters");
      if (response.data.success) {
        setDistricts(response.data.districts || []);
      }
    } catch (err) {
      console.error("Failed to fetch filters", err);
    }
  };

  const fetchCscData = async () => {
    setLoading(true);
    setError("");

    try {
      let query = `http://localhost:8000/api/csc-centers?page=${page}&limit=50`;

      if (filters.district) query += `&district=${filters.district}`;
      if (filters.city) query += `&city=${filters.city}`;
      if (filters.taluk) query += `&taluk=${filters.taluk}`;

      const response = await axios.get(query);

      if (filters.district) {
        setCities(response.data.availableCities || []);
        setTaluks(response.data.availableTaluks || []);
      }

      setData(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError("Failed to fetch data");
    }

    setLoading(false);
  };

  const fetchNearbyCscData = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let query = `http://localhost:8000/api/csc-centers?page=${page}&limit=50&latitude=${latitude}&longitude=${longitude}&nearby=true`;

        try {
          const response = await axios.get(query);
          setData(response.data.data || []);
          setTotalPages(response.data.totalPages || 1);
        } catch (err) {
          setError("Failed to fetch nearby data");
        }

        setLoading(false);
      },
      (err) => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex">
      <InfoPopup purposeText="This page helps you locate Common Service Centres (CSCs) near you, providing detailed information about each center and allowing you to filter by district, city, and taluk, as well as view nearby CSCs based on your location. CSCs are access points for delivering various government, financial, social, and digital services to citizens, especially in rural and remote areas." />
     <Header/>
      {/* Sidebar */}
      <div className="w-1/4 mt-20 p-4 h-screen overflow-y-auto border-r">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        <label className="block mb-2">District</label>
        <select
          className="border p-2 rounded w-full"
          value={filters.district}
          onChange={(e) =>
            setFilters({ district: e.target.value, city: "", taluk: "" })
          }
        >
          <option value="">Select District</option>
          {districts.map((dist, index) => (
            <option key={index} value={dist}>
              {dist}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">City</label>
        <select
          className="border p-2 rounded w-full"
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value, taluk: "" })
          }
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Taluk</label>
        <select
          className="border p-2 rounded w-full"
          value={filters.taluk}
          onChange={(e) => setFilters({ ...filters, taluk: e.target.value })}
        >
          <option value="">Select Taluk</option>
          {taluks.map((taluk, index) => (
            <option key={index} value={taluk}>
              {taluk}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-cyan-600"
              checked={showNearby}
              onChange={(e) => {
                setShowNearby(e.target.checked);
                setFilters({ district: "", city: "", taluk: "" });
                setPage(1);
              }}
            />
            <span className="ml-2 text-sm">Show Nearby CSCs</span>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 mt-20 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">CSC Centers</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="border p-2">S. No</th>
                  <th className="border p-2">Center Name</th>
                  <th className="border p-2">District</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Mobile No</th>
                  <th className="border p-2">Operator Name</th>
                  <th className="border p-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((center, index) => {
                    const addressParts = [
                      center.street,
                      center.area,
                      center.city,
                      center.pin_code,
                    ]
                      .filter((part) => part)
                      .join(", ");

                    return (
                      <tr key={index} className="border">
                        <td className="border p-2">{center.sno || "N/A"}</td>
                        <td className="border p-2">{center.center_name || "N/A"}</td>
                        <td className="border p-2">{center.district_s || "N/A"}</td>
                        <td className="border p-2">{addressParts || "N/A"}</td>
                        <td className="border p-2">{center.mobile_no || "N/A"}</td>
                        <td className="border p-2">{center.operator_n || "N/A"}</td>
                        <td className="border p-2">
                          <button
                            onClick={() => {
                              setSelectedCenter({
                                latitude: center.point_y,
                                longitude: center.point_x,
                              });
                              setIsModalOpen(true);
                            }}
                            className="bg-cyan-600 text-white px-2 py-1 rounded"
                          >
                            View Map
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300" : "bg-cyan-600 text-white"}`}
              >
                Previous
              </button>

              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-cyan-600 text-white"}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for Map View */}
      {isModalOpen && selectedCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[500px] relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedCenter(null);
              }}
            >
              ❌
            </button>
            <MapView
              latitude={selectedCenter.latitude}
              longitude={selectedCenter.longitude}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CscCenters;
