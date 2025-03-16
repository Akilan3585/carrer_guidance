import React from 'react';
import { Link } from 'react-router-dom';
import useFetchCareers from '../hooks/useFetchCareers.js';

const CareerResults = () => {
  const { careers, loading, error } = useFetchCareers();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl text-white animate-pulse">Loading your career matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="text-2xl text-red-500 mb-4">Error loading career matches</div>
        <Link to="/game" className="text-blue-400 hover:text-blue-300">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Career Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold text-blue-400 mb-3">{career.title}</h2>
            <p className="text-gray-300 mb-4">{career.description}</p>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/game"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition"
        >
          Explore More Careers
        </Link>
      </div>
    </div>
  );
};

export default CareerResults;