import { useState, useEffect, useCallback } from 'react';

const INITIAL_STATE = {
  score: 0,
  skillPoints: {
    'Full Stack': { points: 0, level: 1 },
    'AI/ML': { points: 0, level: 1 },
    'ECE Core': { points: 0, level: 1 }
  },
  currentPath: 'Full Stack',
  currentPhase: 'learning',
  gameTime: 0,
  activePowerUps: [],
  progress: 0,
  lastCheckpoint: null
};

const useGameProgress = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [errorLog, setErrorLog] = useState([]);

  // Create checkpoint
  const createCheckpoint = useCallback(() => {
    return {
      ...gameState,
      timestamp: Date.now()
    };
  }, [gameState]);

  // Save checkpoint every 30 seconds
  useEffect(() => {
    const checkpointInterval = setInterval(() => {
      const checkpoint = createCheckpoint();
      setGameState(prev => ({ ...prev, lastCheckpoint: checkpoint }));
    }, 30000);

    return () => clearInterval(checkpointInterval);
  }, [createCheckpoint]);

  // Error logging
  const logError = useCallback((error) => {
    const timestamp = new Date().toISOString();
    setErrorLog(prev => [...prev, { timestamp, error }]);
  }, []);

  // Update game state safely
  const updateGameState = useCallback((updates) => {
    try {
      setGameState(prev => {
        const newState = { ...prev, ...updates };
        
        // Validate state integrity
        if (typeof newState.score !== 'number' || 
            !newState.skillPoints || 
            !newState.currentPath ||
            !newState.currentPhase) {
          throw new Error('Invalid game state detected');
        }
        
        return newState;
      });
    } catch (error) {
      logError(error);
      // If state update fails, restore from last checkpoint or reset
      if (gameState.lastCheckpoint) {
        setGameState(gameState.lastCheckpoint);
      } else {
        setGameState(INITIAL_STATE);
      }
    }
  }, [logError, gameState.lastCheckpoint]);

  // Reset game state
  const resetGameState = useCallback(() => {
    setGameState(INITIAL_STATE);
    setErrorLog([]);
  }, []);

  return {
    gameState,
    updateGameState,
    resetGameState,
    errorLog
  };
};

export default useGameProgress;