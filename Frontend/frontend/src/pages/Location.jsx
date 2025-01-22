import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const Location = () => {
  const mapContainerRef = useRef(null);
  const geocoderContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.2090, 28.6139], // Default location (New Delhi)
      zoom: 10,
    });

    map.on("load", () => {
      setLoading(false);
    });

    // Add Search Bar
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true, // Add a marker on search results
      placeholder: "Search for a location...", // Placeholder text
    });

    geocoderContainerRef.current.appendChild(geocoder.onAdd(map));

    return () => {
      map.remove(); // Cleanup map on unmount
    };
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}

      {/* Search Bar */}
      <div ref={geocoderContainerRef} style={{ marginBottom: "10px" }} />

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default Location;
