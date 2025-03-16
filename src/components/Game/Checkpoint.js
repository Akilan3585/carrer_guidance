import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = {
  'Full Stack': [
    {
      id: 'fs1',
      question: 'Which HTML element is used to define the main content of a document?',
      options: ['<body>', '<main>', '<content>', '<article>'],
      correct: '<main>',
      points: 10
    },
    {
      id: 'fs2',
      question: 'Which CSS property is used for creating responsive layouts?',
      options: ['flex', 'position', 'float', 'align'],
      correct: 'flex',
      points: 10
    },
    {
      id: 'fs3',
      question: 'Which JavaScript framework is known for its virtual DOM?',
      options: ['Angular', 'React', 'Vue', 'Svelte'],
      correct: 'React',
      points: 10
    }
  ],
  'AI/ML': [
    {
      id: 'ai1',
      question: 'Which type of neural network is best for image recognition?',
      options: ['CNN', 'RNN', 'GAN', 'MLP'],
      correct: 'CNN',
      points: 10
    },
    {
      id: 'ai2',
      question: 'What type of learning is used when labels are not provided?',
      options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Transfer'],
      correct: 'Unsupervised',
      points: 10
    },
    {
      id: 'ai3',
      question: 'Which programming language has the most ML libraries?',
      options: ['Java', 'C++', 'Python', 'JavaScript'],
      correct: 'Python',
      points: 10
    }
  ],
  'ECE': [
    {
      id: 'ece1',
      question: 'What is the basic building block of digital circuits?',
      options: ['Transistor', 'Resistor', 'Capacitor', 'Inductor'],
      correct: 'Transistor',
      points: 10
    },
    {
      id: 'ece2',
      question: 'Which component stores electrical charge?',
      options: ['Resistor', 'Capacitor', 'Inductor', 'Diode'],
      correct: 'Capacitor',
      points: 10
    },
    {
      id: 'ece3',
      question: 'What is the heart of a computer system?',
      options: ['RAM', 'CPU', 'GPU', 'Motherboard'],
      correct: 'CPU',
      points: 10
    }
  ]
};

const Checkpoint = ({ path, checkpointId, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  const question = questions[path].find(q => q.id === checkpointId);
  
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Calculate points
    const points = answer === question.correct ? question.points : 0;
    
    // Delay to show result before moving to next checkpoint
    setTimeout(() => {
      onComplete(points);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>
      
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg text-left transition-all ${
              showResult
                ? option === question.correct
                  ? 'bg-green-500 text-white'
                  : option === selectedAnswer
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => !showResult && handleAnswer(option)}
            disabled={showResult}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <p className={`text-xl font-bold ${
            selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'
          }`}>
            {selectedAnswer === question.correct
              ? '🎉 Correct! Moving to next checkpoint...'
              : '❌ Incorrect. The correct answer was: ' + question.correct}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Checkpoint;
