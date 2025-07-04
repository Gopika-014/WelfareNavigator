require("dotenv").config();
const axios = require("axios");

// Haversine formula to calculate distance in KM between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Main controller to fetch CSC Centers with filters and pagination
exports.getCscCenters = async (req, res) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    const resourceId = process.env.DATA_GOV_RESOURCE_ID;

    // Extract query params
    let {
      page = 1,
      limit = 50,
      district = "",
      city = "",
      taluk = "",
      latitude,
      longitude,
      radius = 10,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    radius = parseFloat(radius);

    let allData = [];
    let offset = 0;
    let fetchedRecords = 0;
    let totalRecords = 0;

    // Fetch records in chunks (pagination from data.gov.in)
    do {
      const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=100&offset=${offset}`;
      const response = await axios.get(apiUrl);
      const records = response.data.records || [];

      if (offset === 0) {
        totalRecords = response.data.total || 0;
      }

      allData.push(...records);
      fetchedRecords += records.length;
      offset += 100;
    } while (fetchedRecords < totalRecords);

    const originalData = [...allData];

    // Apply filters
    if (district) {
      allData = allData.filter(
        (center) =>
          center["district_s"]?.trim().toLowerCase() ===
          district.trim().toLowerCase()
      );
    }

    if (city) {
      allData = allData.filter(
        (center) =>
          center["city"]?.trim().toLowerCase() ===
          city.trim().toLowerCase()
      );
    }

    if (taluk) {
      allData = allData.filter(
        (center) =>
          center["en_taluk_n"]?.trim().toLowerCase() ===
          taluk.trim().toLowerCase()
      );
    }

    // Filter based on location & radius and sort by distance
if (!isNaN(latitude) && !isNaN(longitude)) {
  allData = allData
    .map((center) => {
      const centerLat = parseFloat(center.point_y);
      const centerLon = parseFloat(center.point_x);
      if (isNaN(centerLat) || isNaN(centerLon)) return null;
      const distance = haversineDistance(
        latitude,
        longitude,
        centerLat,
        centerLon
      );
      return { ...center, distance };
    })
    .filter((center) => center && center.distance <= radius)
    .sort((a, b) => a.distance - b.distance); // sort by distance ASC
}


    // Extract available cities and taluks for UI dropdowns
    let filteredCities = [];
    let filteredTaluks = [];

    if (district) {
      filteredCities = [
        ...new Set(
          originalData
            .filter(
              (center) =>
                center["district_s"]?.trim().toLowerCase() ===
                district.trim().toLowerCase()
            )
            .map((center) => center["city"])
        ),
      ].filter(Boolean);

      filteredTaluks = [
        ...new Set(
          originalData
            .filter(
              (center) =>
                center["district_s"]?.trim().toLowerCase() ===
                district.trim().toLowerCase()
            )
            .map((center) => center["en_taluk_n"])
        ),
      ].filter(Boolean);
    }

    if (city) {
      filteredTaluks = [
        ...new Set(
          originalData
            .filter(
              (center) =>
                center["city"]?.trim().toLowerCase() ===
                city.trim().toLowerCase()
            )
            .map((center) => center["en_taluk_n"])
        ),
      ].filter(Boolean);
    }

    if (!district) {
      filteredCities = [
        ...new Set(originalData.map((center) => center["city"])),
      ].filter(Boolean);
      filteredTaluks = [
        ...new Set(originalData.map((center) => center["en_taluk_n"])),
      ].filter(Boolean);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedData = allData.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(allData.length / limit);

    res.json({
      success: true,
      totalRecords: allData.length,
      page,
      limit,
      totalPages,
      data: paginatedData,
      availableCities: filteredCities,
      availableTaluks: filteredTaluks,
    });
  } catch (error) {
    console.error("Error fetching CSC centers:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch CSC centers data" });
  }
};

// Get all unique filters (districts, cities, taluks)
exports.getCscFilters = async (req, res) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    const resourceId = process.env.DATA_GOV_RESOURCE_ID;

    const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=10000`;
    const response = await axios.get(apiUrl);
    const data = response.data.records || [];

    const districts = [
      ...new Set(data.map((center) => center.district_s).filter(Boolean)),
    ];
    const cities = [
      ...new Set(data.map((center) => center.city).filter(Boolean)),
    ];
    const taluks = [
      ...new Set(data.map((center) => center.en_taluk_n).filter(Boolean)),
    ];

    res.json({ success: true, districts, cities, taluks });
  } catch (error) {
    console.error("Error fetching filters:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch filter data" });
  }
};
