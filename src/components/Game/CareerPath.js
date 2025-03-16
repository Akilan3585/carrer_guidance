import React from 'react';
import { motion } from 'framer-motion';

const CareerPath = ({ path, icon, description, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all"
      onClick={() => onSelect(path)}
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{icon}</span>
        <h3 className="text-xl font-bold text-white">{path}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default CareerPath;
