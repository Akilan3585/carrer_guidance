import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameControls = ({ onMove, onExit }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle keyboard controls with visual feedback
  const handleKeyDown = useCallback((e) => {
    let direction = [0, 0];
    let keyPressed = '';

    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        direction = [-1, 0];
        keyPressed = '←';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        direction = [1, 0];
        keyPressed = '→';
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        direction = [0, 1];
        keyPressed = '↑';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        direction = [0, -1];
        keyPressed = '↓';
        break;
      case 'Escape':
        if (onExit) onExit();
        return;
      default:
        return;
    }

    // Show visual feedback
    setShowFeedback({ key: keyPressed, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTimeout(() => setShowFeedback(null), 200);

    onMove(direction);
  }, [onMove, onExit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Enhanced touch controls with visual feedback
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const deltaTime = Date.now() - touchStart.time;
    
    // Dynamic sensitivity based on swipe speed
    const minSwipeDistance = Math.min(30, Math.max(20, deltaTime / 10));

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        const direction = deltaX > 0 ? 'right' : 'left';
        if (direction !== swipeDirection) {
          setSwipeDirection(direction);
          onMove([direction === 'right' ? 1 : -1, 0]);
          
          // Show swipe feedback
          setShowFeedback({
            key: direction === 'right' ? '→' : '←',
            x: touch.clientX,
            y: touch.clientY
          });
        }
      } else {
        // Vertical swipe
        const direction = deltaY > 0 ? 'down' : 'up';
        if (direction !== swipeDirection) {
          setSwipeDirection(direction);
          onMove([0, direction === 'up' ? 1 : -1]);
          
          // Show swipe feedback
          setShowFeedback({
            key: direction === 'up' ? '↑' : '↓',
            x: touch.clientX,
            y: touch.clientY
          });
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setSwipeDirection(null);
    setTimeout(() => setShowFeedback(null), 200);
  };

  return (
    <>
      {/* Touch Surface */}
      <div
        className="absolute inset-0 touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Visual Feedback Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none text-4xl text-white font-bold"
            style={{
              left: showFeedback.x - 20,
              top: showFeedback.y - 20,
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            {showFeedback.key}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onExit}
        className="fixed top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl backdrop-blur-sm pointer-events-auto font-bold shadow-lg shadow-red-500/30 border border-white/10"
      >
        <div className="flex items-center gap-2">
          <span>Exit Game</span>
          <span className="text-sm opacity-70">(ESC)</span>
        </div>
      </motion.button>

      {/* Touch Controls Indicator */}
      <div className="fixed bottom-4 left-4 md:hidden">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg"
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
    </>
  );
};

export default GameControls;