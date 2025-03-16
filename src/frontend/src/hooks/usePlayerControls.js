import { useState, useEffect } from "react";

const usePlayerControls = () => {
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 2, z: 0 });
  const speed = 0.05; // Movement speed
  const gravity = 0.002; // Slow downward movement

  useEffect(() => {
    const handleKeyDown = (event) => {
      setVelocity((prev) => {
        switch (event.key) {
          case "ArrowUp": // Move Up
            return { ...prev, y: prev.y + speed };
          case "ArrowDown": // Move Down
            return { ...prev, y: prev.y - speed };
          case "ArrowLeft": // Move Left
            return { ...prev, x: prev.x - speed };
          case "ArrowRight": // Move Right
            return { ...prev, x: prev.x + speed };
          case "w": // Move Forward
            return { ...prev, z: prev.z - speed };
          case "s": // Move Backward
            return { ...prev, z: prev.z + speed };
          default:
            return prev;
        }
      });
    };

    const handleKeyUp = () => {
      setVelocity({ x: 0, y: 0, z: 0 });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Update position based on velocity & gravity
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => ({
        x: prev.x + velocity.x,
        y: Math.max(1, prev.y + velocity.y - gravity), // Prevent falling below ground
        z: prev.z + velocity.z,
      }));
    }, 16); // Smooth 60FPS movement

    return () => clearInterval(interval);
  }, [velocity]);

  return position;
};

export default usePlayerControls;
