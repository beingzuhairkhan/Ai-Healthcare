import { useState, useEffect } from "react";
import { token } from "../../config.js";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (!token) throw new Error("Authorization token is missing.");

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal, // Attach signal for cleanup
        });

        if (!res.ok) {
          const result = await res.json(); // Parse error message
          throw new Error(result.message || "Failed to fetch data");
        }

        const result = await res.json(); // Parse JSON only if `res.ok`
        setData(result.data);
      } catch (error) {
        if (error.name === "AbortError") return; // Ignore fetch abortion
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup function to cancel fetch on unmount
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
