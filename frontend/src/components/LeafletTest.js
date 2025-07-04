import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LeafletTest= () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", // Free open-source map tiles
      center: [80.2707, 13.0827], // Default: Chennai, Tamil Nadu
      zoom: 10,
    });

    new maplibregl.Marker().setLngLat([80.2707, 13.0827]).addTo(map); // Add marker

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};

export default LeafletTest;
