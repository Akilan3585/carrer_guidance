import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/career")
      .then((response) => {
        setCareers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching careers:", error);
        setLoading(false);
      });
  }, []);

  return { careers, loading };
};

export default useFetchCareers;
