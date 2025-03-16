import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.js';

const SuccessStory = ({ story }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-white/10"
  >
    <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
    <p className="text-white/80 text-sm mb-4">{story.role}</p>
    <ul className="space-y-2">
      {story.journey.map((step, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center text-sm text-white/70"
        >
          <span className="mr-2">•</span>
          {step}
        </motion.li>
      ))}
    </ul>
    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
      <p className="text-blue-400 text-sm font-medium">Impact: {story.impact}</p>
    </div>
  </motion.div>
);

const PreparationGuide = ({ guide }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-white/10"
  >
    <h3 className="text-xl font-bold text-white mb-4">{guide.title}</h3>
    <div className="space-y-4">
      {guide.sections.map((section, index) => (
        <div key={index}>
          <h4 className="text-white font-medium mb-2">{section.title}</h4>
          <ul className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <motion.li
                key={itemIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIndex * 0.1 }}
                className="flex items-center text-sm text-white/70"
              >
                <span className="mr-2">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </motion.div>
);

const pathData = {
  'Full Stack': {
    successStories: [
      {
        name: 'Sarah Chen',
        role: 'Microsoft Tech Lead',
        journey: [
          'Started in high school computer club',
          'Built websites for local businesses',
          'Now leads 20 developers'
        ],
        impact: 'Microsoft Teams features'
      },
      {
        name: 'Alex Rodriguez',
        role: 'Startup Founder',
        journey: [
          'Self-taught through online courses',
          'Started freelancing at 18',
          'Founded TechFlow Solutions at 23'
        ],
        impact: 'Helping small businesses digitize'
      }
    ],
    preparation: {
      title: 'Full Stack Development Path',
      sections: [
        {
          title: 'Early Preparation',
          items: [
            'Join coding clubs',
            'Take CS electives',
            'Participate in hackathons',
            'Build personal projects'
          ]
        },
        {
          title: 'Real Projects',
          items: [
            'Social media platforms',
            'E-commerce websites',
            'Mobile apps',
            'Enterprise software'
          ]
        }
      ]
    }
  },
  'AI/ML': {
    successStories: [
      {
        name: 'Priya Patel',
        role: 'DeepMind Researcher',
        journey: [
          'Math competition winner',
          'Early ML projects in school',
          'Published research at 19'
        ],
        impact: 'Healthcare AI models'
      },
      {
        name: 'James Wilson',
        role: 'OpenAI Lead',
        journey: [
          'Started in robotics club',
          'Won AI competitions',
          'Now develops next-gen AI'
        ],
        impact: 'Making AI accessible'
      }
    ],
    preparation: {
      title: 'AI/ML Development Path',
      sections: [
        {
          title: 'Early Preparation',
          items: [
            'Focus on math competitions',
            'Join robotics club',
            'Work on data science projects',
            'Learn Python programming'
          ]
        },
        {
          title: 'Real Projects',
          items: [
            'AI chatbots',
            'Facial recognition systems',
            'Recommendation engines',
            'Autonomous systems'
          ]
        }
      ]
    }
  },
  'ECE': {
    successStories: [
      {
        name: 'Akiko Tanaka',
        role: 'Samsung IoT Pioneer',
        journey: [
          'DIY electronics since 14',
          'Science fair winner',
          'Now leads IoT innovation'
        ],
        impact: 'Energy-saving technologies'
      },
      {
        name: 'David Kumar',
        role: 'Intel Chip Designer',
        journey: [
          'Started with Arduino',
          'Built musical instruments',
          'Now designs processors'
        ],
        impact: 'Powers millions of devices'
      }
    ],
    preparation: {
      title: 'ECE Development Path',
      sections: [
        {
          title: 'Early Preparation',
          items: [
            'Join electronics club',
            'Participate in science fairs',
            'Build DIY electronics',
            'Learn Arduino/Raspberry Pi'
          ]
        },
        {
          title: 'Real Projects',
          items: [
            'IoT devices',
            'Smart home systems',
            'Embedded controllers',
            'Sensor networks'
          ]
        }
      ]
    }
  }
};

const GameUI = ({ currentPath }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('stories');
  const pathInfo = pathData[currentPath];

  if (!pathInfo) return null;

  return (
    <div className="mt-8 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'stories'
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Success Stories
          </button>
          <button
            onClick={() => setActiveTab('prepare')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'prepare'
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Preparation Guide
          </button>
        </div>
        {isAuthenticated && (
          <div className="text-sm text-white/70">
            <span>Welcome back, {user.username}! </span>
            {user.gameProgress?.completedPaths?.includes(currentPath.toLowerCase().replace('/', '').replace(' ', '')) && (
              <span className="text-green-400">✓ Path Completed</span>
            )}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stories' ? (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {pathInfo.successStories.map((story, index) => (
              <SuccessStory key={index} story={story} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="prepare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PreparationGuide guide={pathInfo.preparation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameUI;
