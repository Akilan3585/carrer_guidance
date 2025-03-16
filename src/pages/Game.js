import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';
import DomainPathGame from '../components/Game/DomainPathGame.js';
import GameUI from '../components/UI/GameUI.js';

const domains = {
  'Full Stack': {
    icon: '💻',
    color: 'from-blue-600 to-indigo-500',
    description: 'Build complete web applications and software solutions'
  },
  'AI/ML': {
    icon: '🤖',
    color: 'from-purple-600 to-indigo-500',
    description: 'Create intelligent systems and analyze complex data'
  },
  'ECE': {
    icon: '⚡',
    color: 'from-green-600 to-emerald-500',
    description: 'Design electronic systems and embedded solutions'
  }
};

const Game = () => {
  const { user } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameResults, setGameResults] = useState(null);

  const handleDomainSelect = useCallback((domain) => {
    setSelectedDomain(domain);
    setGameStarted(true);
  }, []);

  const handleGameComplete = useCallback((results) => {
    setGameResults(results);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedDomain(null);
    setGameStarted(false);
    setGameResults(null);
  }, []);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <h1 className="text-3xl text-white font-bold mb-8 text-center">Choose Your Career Path</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(domains).map(([domain, info]) => (
            <motion.button
              key={domain}
              onClick={() => handleDomainSelect(domain)}
              className={`p-6 rounded-xl bg-gradient-to-r ${info.color} hover:opacity-90 transition-opacity`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-4">{info.icon}</div>
              <h2 className="text-xl font-bold text-white mb-2">{domain}</h2>
              <p className="text-white/80 text-sm">{info.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl text-white font-bold">{selectedDomain} Path</h2>
            {user && (
              <p className="text-gray-400 mt-1">Playing as {user.username}</p>
            )}
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Choose Different Path
          </button>
        </div>

        {gameResults ? (
          <div className="bg-gray-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Your Results</h3>
            <div className="mb-6">
              <p className="text-lg mb-2">Score: {gameResults.score} / 30</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${(gameResults.score / 30) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl mb-2">Recommended Career Path:</h4>
              <p className="text-2xl font-bold text-blue-400">{gameResults.recommendation}</p>
              <p className="mt-4 text-white/80">
                Based on your performance, we recommend exploring opportunities as a {gameResults.recommendation.toLowerCase()}. 
                Check out the career details tab for more information about this role!
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Another Path
            </button>
          </div>
        ) : (
          <DomainPathGame
            selectedDomain={selectedDomain}
            onGameComplete={handleGameComplete}
          />
        )}

        <GameUI currentPath={selectedDomain} />
      </div>
    </div>
  );
};

export default Game;