import { useState } from "react";

const useGameProgress = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);

  const selectCareer = (career) => {
    setSelectedCareer(career);
    console.log(`Selected Career: ${career.title}`);
  };

  return { selectedCareer, selectCareer };
};

export default useGameProgress;
