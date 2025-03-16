import React from 'react';
import { motion } from 'framer-motion';

const SuccessStory = ({ story }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-10 transition-all"
  >
    <div className="flex items-start mb-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white">{story.name}</h3>
        <p className="text-blue-400 font-semibold">{story.role}</p>
      </div>
      <div className="bg-blue-500 bg-opacity-20 rounded-full p-2">
        {story.role.includes('Microsoft') && '🪟'}
        {story.role.includes('DeepMind') && '🧠'}
        {story.role.includes('OpenAI') && '🤖'}
        {story.role.includes('Samsung') && '📱'}
        {story.role.includes('Intel') && '💻'}
        {story.role.includes('Startup') && '🚀'}
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center text-gray-300">
        <span className="text-blue-400 mr-2">🌱</span>
        <p>{story.journey}</p>
      </div>
      <div className="flex items-center text-gray-300">
        <span className="text-blue-400 mr-2">💫</span>
        <p>{story.impact}</p>
      </div>
    </div>
  </motion.div>
);

const SuccessStories = ({ path, stories }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Success Stories in {path}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <SuccessStory key={index} story={story} />
        ))}
      </div>

      <div className="mt-8 bg-blue-500 bg-opacity-10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Universal Success Tips</h3>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-300">
            <span className="text-blue-400 mr-2">🎯</span>
            Start with basic projects
          </li>
          <li className="flex items-center text-gray-300">
            <span className="text-blue-400 mr-2">👥</span>
            Join online communities
          </li>
          <li className="flex items-center text-gray-300">
            <span className="text-blue-400 mr-2">👨‍💻</span>
            Follow industry experts
          </li>
          <li className="flex items-center text-gray-300">
            <span className="text-blue-400 mr-2">📂</span>
            Build project portfolio
          </li>
          <li className="flex items-center text-gray-300">
            <span className="text-blue-400 mr-2">📈</span>
            Stay updated with trends
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SuccessStories;
