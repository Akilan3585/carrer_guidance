import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';

const Profile = () => {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [successMessage, setSuccessMessage] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const careerRecommendation = () => {
    const score = user.gameProgress?.score || 0;
    const completedPaths = user.gameProgress?.completedPaths || [];

    let recommendation = {
      title: '',
      description: '',
      nextSteps: []
    };

    if (completedPaths.includes('fullstack')) {
      if (score >= 24) {
        recommendation = {
          title: 'Senior Full Stack Developer',
          description: 'You show exceptional understanding of full-stack development concepts!',
          nextSteps: [
            'Lead development team projects',
            'Mentor junior developers',
            'Architect complex systems'
          ]
        };
      } else if (score >= 15) {
        recommendation = {
          title: 'Web Developer',
          description: 'You have a solid foundation in web development.',
          nextSteps: [
            'Build portfolio projects',
            'Learn advanced frameworks',
            'Contribute to open source'
          ]
        };
      } else {
        recommendation = {
          title: 'Junior Frontend Developer',
          description: 'You\'re starting your journey in web development.',
          nextSteps: [
            'Master HTML, CSS, JavaScript',
            'Create responsive designs',
            'Learn a frontend framework'
          ]
        };
      }
    } else if (completedPaths.includes('ai')) {
      if (score >= 24) {
        recommendation = {
          title: 'AI Research Scientist',
          description: 'You demonstrate advanced understanding of AI concepts!',
          nextSteps: [
            'Conduct AI research',
            'Publish academic papers',
            'Develop novel algorithms'
          ]
        };
      } else if (score >= 15) {
        recommendation = {
          title: 'Machine Learning Engineer',
          description: 'You have good knowledge of machine learning fundamentals.',
          nextSteps: [
            'Build ML models',
            'Work on data pipelines',
            'Learn cloud platforms'
          ]
        };
      } else {
        recommendation = {
          title: 'Data Analyst',
          description: 'You\'re beginning your journey in AI/ML.',
          nextSteps: [
            'Master Python',
            'Learn data analysis',
            'Study ML basics'
          ]
        };
      }
    } else if (completedPaths.includes('ece')) {
      if (score >= 24) {
        recommendation = {
          title: 'Hardware Architect',
          description: 'You excel in hardware design and architecture!',
          nextSteps: [
            'Design complex systems',
            'Lead hardware teams',
            'Innovate new solutions'
          ]
        };
      } else if (score >= 15) {
        recommendation = {
          title: 'Electronics Engineer',
          description: 'You have good understanding of electronics fundamentals.',
          nextSteps: [
            'Design circuits',
            'Work on IoT projects',
            'Learn PCB design'
          ]
        };
      } else {
        recommendation = {
          title: 'Circuit Designer',
          description: 'You\'re starting your journey in electronics.',
          nextSteps: [
            'Master circuit basics',
            'Practice with Arduino',
            'Study digital logic'
          ]
        };
      }
    }

    return recommendation;
  };

  const renderSuccessStories = () => {
    const stories = {
      fullstack: [
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
      ai: [
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
      ece: [
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
      ]
    };

    const path = user.gameProgress?.completedPaths?.[0] || 'fullstack';
    return stories[path] || stories.fullstack;
  };

  const renderPreparationGuide = () => {
    const guides = {
      fullstack: {
        early: [
          'Join coding clubs',
          'Take CS electives',
          'Participate in hackathons',
          'Build personal projects'
        ],
        projects: [
          'Social media platforms',
          'E-commerce websites',
          'Mobile apps',
          'Enterprise software'
        ]
      },
      ai: {
        early: [
          'Focus on math competitions',
          'Join robotics club',
          'Work on data science projects',
          'Learn Python programming'
        ],
        projects: [
          'AI chatbots',
          'Facial recognition systems',
          'Recommendation engines',
          'Autonomous systems'
        ]
      },
      ece: {
        early: [
          'Join electronics club',
          'Participate in science fairs',
          'Build DIY electronics',
          'Learn Arduino/Raspberry Pi'
        ],
        projects: [
          'IoT devices',
          'Smart home systems',
          'Embedded controllers',
          'Sensor networks'
        ]
      }
    };

    const path = user.gameProgress?.completedPaths?.[0] || 'fullstack';
    return guides[path] || guides.fullstack;
  };

  const recommendation = careerRecommendation();
  const successStories = renderSuccessStories();
  const preparationGuide = renderPreparationGuide();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Score: {user.gameProgress?.score || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <nav className="flex space-x-4 p-4">
            {['overview', 'stories', 'prepare'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Career Recommendation</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-900">{recommendation.title}</h3>
                      <p className="text-blue-700 mt-2">{recommendation.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Next Steps:</h4>
                      <ul className="space-y-2">
                        {recommendation.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="mr-2">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-900">Completed Paths</h3>
                      <div className="mt-2 space-y-2">
                        {user.gameProgress?.completedPaths?.map((path) => (
                          <div key={path} className="flex items-center text-green-700">
                            <span className="mr-2">✓</span>
                            {path.charAt(0).toUpperCase() + path.slice(1)} Path
                          </div>
                        )) || <p className="text-gray-600">No paths completed yet</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stories' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {successStories.map((story, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-blue-600 font-medium mb-4">{story.role}</p>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Journey:</h4>
                        <ul className="space-y-2">
                          {story.journey.map((step, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                              <span className="mr-2">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900">Impact:</h4>
                          <p className="text-gray-700 mt-1">{story.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prepare' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Preparation Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Early Preparation</h3>
                    <ul className="space-y-3">
                      {preparationGuide.early.map((step, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Projects</h3>
                    <ul className="space-y-3">
                      {preparationGuide.projects.map((project, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Universal Success Tips</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Start with basic projects',
                      'Join online communities',
                      'Follow industry experts',
                      'Build project portfolio',
                      'Stay updated with trends'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="mr-2">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
