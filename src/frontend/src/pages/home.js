import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Career Guidance Game</h1>
      <p className="text-lg">Explore career paths in an interactive way!</p>
      <Link to="/game">
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-bold rounded-lg hover:bg-gray-200">
          Start Your Journey
        </button>
      </Link>
    </div>
  );
};

export default Home;
