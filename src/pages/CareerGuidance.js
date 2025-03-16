import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CareerGuidance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!location.state?.skillPoints) {
          navigate('/game');
          return;
        }

        const response = await fetch('http://localhost:5002/api/career-guidance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillPoints: location.state.skillPoints,
            dominantPath: location.state.dominantPath,
          }),
        });

        const data = await response.json();
        setRecommendations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">No recommendations available</div>
      </div>
    );
  }

  const pathColors = {
    'Full Stack': '#3B82F6',
    'AI/ML': '#8B5CF6',
    'ECE': '#10B981'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Career Path Analysis
          </motion.h1>
          <p className="text-blue-200 text-lg">
            Based on your performance in the skill collection game
          </p>
        </div>

        {/* Dominant Path */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: pathColors[recommendations.path] }}>
            Recommended Path: {recommendations.path}
          </h2>
          <p className="text-gray-300 mb-4">{recommendations.description}</p>
        </motion.div>

        {/* Skill Distribution */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Skill Distribution</h2>
          <div className="space-y-4">
            {Object.entries(recommendations.skillLevels).map(([path, level]) => (
              <div key={path} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{path}</span>
                  <span className="text-gray-300">{Math.round(level)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: pathColors[path] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Recommendations */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recommended Careers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.careers.map((career, index) => (
              <motion.div
                key={career}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-10 transition-all"
              >
                <h3 className="text-lg font-semibold" style={{ color: pathColors[recommendations.path] }}>
                  {career}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Required Skills */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Key Skills to Develop</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <span className="text-gray-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Play Again Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/game')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            Play Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CareerGuidance;
