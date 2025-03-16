import { useLocation } from "react-router-dom";

const CareerResults = () => {
  const location = useLocation();
  const { career } = location.state || { career: "Unknown" };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Your Best Career Fit:</h1>
      <p className="text-2xl text-blue-400">{career.name}</p>
      <p className="mt-4 text-gray-300">Explore courses & job opportunities in {career.name}!</p>
    </div>
  );
};

export default CareerResults;
