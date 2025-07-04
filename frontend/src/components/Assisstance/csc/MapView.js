import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://api.maptiler.com/maps/basic-v2/style.json?key=Bw5AogdOAS71c9hjtr4m", // Use MapTiler's style
      center: [longitude, latitude],
      zoom: 13,
    });

    setTimeout(() => {
      map.resize(); // Ensure map renders correctly
    }, 500);

    // Add Marker
    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove(); // Cleanup on unmount
  }, [latitude, longitude]);

  return (
    <div className="w-full h-96 border border-gray-300 rounded-lg">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default MapView;
