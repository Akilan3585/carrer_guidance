import { useState, useCallback } from 'react';

const usePlayerControls = () => {
  const [playerPosition, setPlayerPosition] = useState([0, 2, 0]);

  const updatePlayerPosition = useCallback((movement) => {
    setPlayerPosition(current => [
      // Keep player within bounds
      Math.max(-10, Math.min(10, current[0] + movement[0])),
      Math.max(0, Math.min(10, current[1] + movement[1])),
      current[2] + movement[2]
    ]);
  }, []);

  return { playerPosition, updatePlayerPosition };
};

export default usePlayerControls;