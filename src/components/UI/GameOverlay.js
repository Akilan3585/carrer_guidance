import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameOverlay = ({ score, progress, currentPath, onExit }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [powerUps, setPowerUps] = useState({
    speedBoost: { active: false, cooldown: 0 },
    skillMagnet: { active: true, duration: 3 }
  });

  // Hide controls help after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top Bar with Glass Effect */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          {/* Score Card */}
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white font-bold shadow-lg shadow-blue-500/20"
          >
            <div className="text-xs uppercase tracking-wider opacity-70">Score</div>
            <div className="text-2xl font-black">{score || 0}</div>
          </motion.div>
          
          {/* Multiplier Badge */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 text-white font-bold shadow-lg shadow-purple-500/20"
          >
            <div className="text-xs uppercase tracking-wider opacity-70">Multiplier</div>
            <div className="text-2xl font-black">×{multiplier}</div>
          </motion.div>
        </div>

        {/* Progress Bar with Glow */}
        <div className="flex-1 mx-8">
          <div className="relative h-8 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              <span className="drop-shadow-lg">{Math.round(progress * 100)}% Complete</span>
            </div>
          </div>
        </div>

        {/* Current Path Badge */}
        <motion.div 
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 text-white font-bold shadow-lg shadow-green-500/20"
        >
          <div className="text-xs uppercase tracking-wider opacity-70">Path</div>
          <div className="text-lg truncate max-w-[150px] font-black">{currentPath || 'Exploring'}</div>
        </motion.div>
      </motion.div>

      {/* Controls Help Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-2xl p-6 text-white text-center backdrop-blur-md border border-white/10"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Game Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="inline-block bg-white/10 rounded-lg px-3 py-1 mr-2">
                      WASD
                    </span>
                    <span className="text-gray-300">Movement</span>
                  </p>
                  <p className="text-lg">
                    <span className="inline-block bg-white/10 rounded-lg px-3 py-1 mr-2">
                      ↑↓←→
                    </span>
                    <span className="text-gray-300">Arrow Keys</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="inline-block bg-white/10 rounded-lg px-3 py-1 mr-2">
                      👆
                    </span>
                    <span className="text-gray-300">Touch/Swipe</span>
                  </p>
                  <p className="text-lg">
                    <span className="inline-block bg-white/10 rounded-lg px-3 py-1 mr-2">
                      ESC
                    </span>
                    <span className="text-gray-300">Exit Game</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Power-ups Panel */}
      <div className="absolute left-4 top-24 flex flex-col gap-3">
        {/* Speed Boost */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          className={`bg-gradient-to-r ${
            powerUps.speedBoost.active 
              ? 'from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/30' 
              : 'from-gray-700 to-gray-800'
          } rounded-xl p-3 backdrop-blur-sm border border-white/10`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚡</div>
            <div>
              <div className="text-xs text-white/70 uppercase tracking-wider">Speed Boost</div>
              <div className="text-white font-bold">
                {powerUps.speedBoost.active ? 'Active!' : 'Ready'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Magnet */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          className={`bg-gradient-to-r ${
            powerUps.skillMagnet.active 
              ? 'from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30' 
              : 'from-gray-700 to-gray-800'
          } rounded-xl p-3 backdrop-blur-sm border border-white/10`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧲</div>
            <div>
              <div className="text-xs text-white/70 uppercase tracking-wider">Skill Magnet</div>
              <div className="text-white font-bold">
                {powerUps.skillMagnet.active ? `${powerUps.skillMagnet.duration}s` : 'Ready'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Touch Indicator */}
      <div className="fixed bottom-4 left-4 md:hidden">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center border border-white/20"
        >
          <motion.span 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            👆
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default GameOverlay;
