import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const careerPaths = [
  {
    title: 'Full Stack Development',
    icon: '💻',
    description: 'Build complete web applications and software solutions',
    color: 'from-blue-600 to-indigo-500'
  },
  {
    title: 'AI/ML',
    icon: '🤖',
    description: 'Create intelligent systems and analyze complex data',
    color: 'from-purple-600 to-indigo-500'
  },
  {
    title: 'ECE',
    icon: '⚡',
    description: 'Design electronic systems and embedded solutions',
    color: 'from-green-600 to-emerald-500'
  }
];

const successStories = [
  {
    name: 'Sarah Chen',
    role: 'Microsoft Tech Lead',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    quote: 'Started in high school computer club, now leads 20 developers at Microsoft'
  },
  {
    name: 'Priya Patel',
    role: 'DeepMind Researcher',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    quote: 'Math competition winner to pioneering AI healthcare models'
  },
  {
    name: 'Akiko Tanaka',
    role: 'Samsung IoT Pioneer',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5',
    quote: 'From DIY electronics at 14 to leading IoT innovation at Samsung'
  }
];

const LandingPage = () => {
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Shape Your Future with</span>
                  <span className="block text-blue-500">Career Guidance AI</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Discover your perfect career path through interactive learning and personalized recommendations
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md shadow"
                  >
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      {/* Career Paths */}
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Explore Career Paths
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Choose your path and start your journey today
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {careerPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPath(path.title)}
                  onHoverEnd={() => setHoveredPath(null)}
                  className={`relative rounded-lg p-6 bg-gradient-to-r ${path.color} overflow-hidden cursor-pointer transform transition-all duration-300 ${
                    hoveredPath === path.title ? 'scale-105' : ''
                  }`}
                >
                  <div className="text-4xl mb-4">{path.icon}</div>
                  <h3 className="text-lg font-medium text-white">{path.title}</h3>
                  <p className="mt-2 text-white/80">{path.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-300">
              Learn from those who've walked the path before you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={story.image}
                  alt={story.name}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{story.name}</h3>
                  <p className="text-blue-400">{story.role}</p>
                  <p className="mt-2 text-gray-400">{story.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Journey CTA */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Begin Your Journey?
              </h2>
              <p className="mt-4 text-xl text-white/90">
                Join us and discover your perfect career path
              </p>
              <div className="mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/game"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Start Your Journey 🚀
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
