import React from 'react';
import { useNavigate } from 'react-router-dom';

const FindCareerBtn = ({ onProgress }) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    // Show button after 30 seconds of gameplay
    const timer = setTimeout(() => setIsReady(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    onProgress(1); // Set progress to complete
    setTimeout(() => navigate('/results'), 1000); // Navigate after progress animation
  };

  if (!isReady) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 animate-pulse"
    >
      Find My Career Path 🚀
    </button>
  );
};

export default FindCareerBtn;
