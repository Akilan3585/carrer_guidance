import { useState, useEffect } from "react";

const AnimatedText = ({ text }) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-purple-500 text-white p-3 text-2xl font-bold rounded-lg shadow-lg animate-bounce">
      {visibleText}
    </div>
  );
};

export default AnimatedText;
