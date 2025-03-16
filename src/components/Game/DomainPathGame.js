import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.js';

const domainGifs = {
  'Full Stack': {
    coding: 'https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif',
    success: 'https://media.giphy.com/media/LOcPt9gfuNOSI/giphy.gif',
    thinking: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif'
  },
  'AI/ML': {
    coding: 'https://media.giphy.com/media/f7omQNmgiyjj5sffvZ/giphy.gif',
    success: 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
    thinking: 'https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif'
  },
  'ECE': {
    coding: 'https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif',
    success: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
    thinking: 'https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif'
  }
};

const checkpointQuestions = {
  'Full Stack': [
    {
      id: 1,
      question: 'Which language is commonly used for web styling?',
      options: ['CSS', 'Python', 'Java', 'C++'],
      correct: 'CSS',
      points: 10,
      explanation: 'CSS (Cascading Style Sheets) is the standard language for styling web pages!'
    },
    {
      id: 2,
      question: 'What is React.js?',
      options: ['Database', 'Frontend Framework', 'Backend Server', 'Operating System'],
      correct: 'Frontend Framework',
      points: 10,
      explanation: 'React is a popular JavaScript library for building user interfaces!'
    },
    {
      id: 3,
      question: 'Which protocol is used for secure data transmission?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correct: 'HTTPS',
      points: 10,
      explanation: 'HTTPS adds encryption to protect data during transmission!'
    }
  ],
  'AI/ML': [
    {
      id: 1,
      question: 'What is a Neural Network?',
      options: ['Computer Network', 'Brain Cells', 'ML Algorithm', 'Database System'],
      correct: 'ML Algorithm',
      points: 10,
      explanation: 'Neural Networks are powerful algorithms inspired by the human brain!'
    },
    {
      id: 2,
      question: 'Which is a type of Machine Learning?',
      options: ['Supervised', 'Controlled', 'Managed', 'Directed'],
      correct: 'Supervised',
      points: 10,
      explanation: 'Supervised learning uses labeled data to train models!'
    },
    {
      id: 3,
      question: 'Best language for AI/ML?',
      options: ['Python', 'Java', 'C++', 'Ruby'],
      correct: 'Python',
      points: 10,
      explanation: 'Python has extensive libraries and tools for AI/ML development!'
    }
  ],
  'ECE': [
    {
      id: 1,
      question: 'What is a microcontroller?',
      options: ['Small Computer', 'Large Processor', 'Memory Unit', 'Display Device'],
      correct: 'Small Computer',
      points: 10,
      explanation: 'Microcontrollers are compact computers on a single chip!'
    },
    {
      id: 2,
      question: 'Which is an Arduino component?',
      options: ['CPU', 'GPU', 'MCU', 'TPU'],
      correct: 'MCU',
      points: 10,
      explanation: 'Arduino uses a Microcontroller Unit (MCU) as its brain!'
    },
    {
      id: 3,
      question: 'What does IoT stand for?',
      options: ['Internet of Things', 'Input of Time', 'Interface of Technology', 'Integration of Tools'],
      correct: 'Internet of Things',
      points: 10,
      explanation: 'IoT connects everyday devices to the internet!'
    }
  ]
};

const DomainPathGame = ({ selectedDomain, onGameComplete }) => {
  const { updateGameProgress } = useAuth();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentGif, setCurrentGif] = useState('thinking');

  const getRecommendation = useCallback((finalScore) => {
    const recommendations = {
      'Full Stack': {
        high: 'Senior Full Stack Developer',
        medium: 'Web Developer',
        low: 'Junior Frontend Developer'
      },
      'AI/ML': {
        high: 'AI Research Scientist',
        medium: 'Machine Learning Engineer',
        low: 'Data Analyst'
      },
      'ECE': {
        high: 'Hardware Architect',
        medium: 'Electronics Engineer',
        low: 'Circuit Designer'
      }
    };

    const level = finalScore >= 24 ? 'high' : finalScore >= 15 ? 'medium' : 'low';
    return recommendations[selectedDomain][level];
  }, [selectedDomain]);

  const handleAnswer = useCallback(async (answer) => {
    const question = checkpointQuestions[selectedDomain][currentQuestion];
    const isCorrect = answer === question.correct;
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
      setCurrentGif('success');
    } else {
      setCurrentGif('coding');
    }

    setShowExplanation(true);
    setTimeout(async () => {
      setCompletedQuestions(prev => [...prev, currentQuestion]);
      setCurrentQuestion(null);
      setShowExplanation(false);
      setCurrentGif('thinking');

      if (completedQuestions.length + 1 === checkpointQuestions[selectedDomain].length) {
        const finalScore = isCorrect ? score + question.points : score;
        const recommendation = getRecommendation(finalScore);

        try {
          // Try to update game progress if user is logged in
          if (updateGameProgress) {
            await updateGameProgress({
              score: finalScore,
              completedPaths: [selectedDomain.toLowerCase().replace('/', '').replace(' ', '')],
              recommendation
            });
          }

          onGameComplete({
            score: finalScore,
            recommendation
          });
        } catch (err) {
          // Silently handle error and continue without saving progress
          console.log('Game progress not saved - user might not be logged in');
          onGameComplete({
            score: finalScore,
            recommendation
          });
        }
      }
    }, 3000);
  }, [currentQuestion, selectedDomain, score, completedQuestions, onGameComplete, getRecommendation, updateGameProgress]);

  const handleKeyPress = useCallback((e) => {
    if (currentQuestion !== null) return;

    const moveAmount = 50;
    const newPosition = { ...position };

    switch (e.key) {
      case 'ArrowUp':
        newPosition.y = Math.max(0, position.y - moveAmount);
        break;
      case 'ArrowDown':
        newPosition.y = Math.min(400, position.y + moveAmount);
        break;
      case 'ArrowLeft':
        newPosition.x = Math.max(0, position.x - moveAmount);
        break;
      case 'ArrowRight':
        newPosition.x = Math.min(800, position.x + moveAmount);
        break;
      default:
        return;
    }

    const checkpointIndex = Math.floor(newPosition.x / 300);
    if (!completedQuestions.includes(checkpointIndex) && checkpointIndex < checkpointQuestions[selectedDomain].length) {
      setCurrentQuestion(checkpointIndex);
    }

    setPosition(newPosition);
  }, [position, currentQuestion, completedQuestions, selectedDomain]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="relative w-full h-[500px] bg-gray-800 rounded-xl overflow-hidden">
      {/* Path and checkpoints */}
      <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-600 transform -translate-y-1/2">
        {[0, 1, 2].map((checkpoint) => (
          <div
            key={checkpoint}
            className={`absolute left-${checkpoint * 300}px top-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
              completedQuestions.includes(checkpoint)
                ? 'bg-green-500'
                : 'bg-yellow-500'
            }`}
          />
        ))}
      </div>

      {/* Player */}
      <motion.div
        className="absolute w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
        animate={position}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ top: position.y, left: position.x }}
      >
        P
      </motion.div>

      {/* Question Modal */}
      <AnimatePresence>
        {currentQuestion !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <div className="mb-4">
                <img
                  src={domainGifs[selectedDomain][currentGif]}
                  alt="Game state"
                  className="w-32 h-32 mx-auto rounded-lg object-cover"
                />
              </div>

              {showExplanation ? (
                <div className="text-center">
                  <p className="text-xl font-semibold mb-4">
                    {checkpointQuestions[selectedDomain][currentQuestion].explanation}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    {checkpointQuestions[selectedDomain][currentQuestion].question}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {checkpointQuestions[selectedDomain][currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Display */}
      <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2">
        <span className="font-semibold">Score: {score}</span>
      </div>
    </div>
  );
};

export default DomainPathGame;
