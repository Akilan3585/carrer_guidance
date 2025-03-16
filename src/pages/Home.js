import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const successStories = [
  {
    name: 'Sarah Chen',
    role: 'Microsoft Tech Lead',
    path: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    story: 'Started in high school computer club, now leads 20 developers at Microsoft'
  },
  {
    name: 'Priya Patel',
    role: 'DeepMind Researcher',
    path: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    story: 'Math competition winner to pioneering AI healthcare models'
  },
  {
    name: 'Akiko Tanaka',
    role: 'Samsung IoT Pioneer',
    path: 'ECE',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5',
    story: 'From DIY electronics at 14 to leading IoT innovation at Samsung'
  }
];

const guidanceData = [
  {
    path: 'Full Stack Development',
    icon: '💻',
    steps: [
      'Join coding clubs and hackathons',
      'Build personal projects',
      'Learn modern frameworks',
      'Practice with real-world projects'
    ]
  },
  {
    path: 'AI/ML',
    icon: '🤖',
    steps: [
      'Focus on mathematics',
      'Join robotics clubs',
      'Learn Python programming',
      'Work on data science projects'
    ]
  },
  {
    path: 'ECE',
    icon: '⚡',
    steps: [
      'Join electronics club',
      'Build DIY projects',
      'Master Arduino/Raspberry Pi',
      'Participate in competitions'
    ]
  }
];

const Home = () => {
  const { user } = useAuth();
  const [showGuidance, setShowGuidance] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Shape Your Future with</span>
                  <span className="block text-blue-500">Career Guidance AI</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Discover your perfect career path through interactive learning and personalized recommendations
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  {!user ? (
                    <>
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
                    </>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-md shadow"
                    >
                      <Link
                        to="/game"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Start Your Journey
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                >
                  <img className="h-48 w-full object-cover" src={story.image} alt={story.name} />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">{story.name}</h3>
                    <p className="text-blue-400">{story.role}</p>
                    <p className="mt-2 text-gray-400">{story.story}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Career Guidance Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white">Career Guidance</h2>
            <button
              onClick={() => setShowGuidance(!showGuidance)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showGuidance ? 'Hide Guidance' : 'Show Guidance'}
            </button>
          </motion.div>

          {showGuidance && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {guidanceData.map((path, index) => (
                <motion.div
                  key={path.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gray-800 rounded-lg p-6"
                >
                  <div className="text-4xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{path.path}</h3>
                  <ul className="space-y-2">
                    {path.steps.map((step, stepIndex) => (
                      <motion.li
                        key={stepIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.2) + (stepIndex * 0.1) }}
                        className="text-gray-400 flex items-center"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;