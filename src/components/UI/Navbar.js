import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.js';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/game', label: 'Game', icon: '🎮', authRequired: true },
    { path: '/career-guidance', label: 'Guidance', icon: '🎯', authRequired: true },
    { path: '/profile', label: 'Profile', icon: '👤', authRequired: true },
  ];

  const getUserInitial = () => {
    if (user?.username) {
      return user.username[0].toUpperCase();
    }
    return '?';
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              🎓
            </motion.div>
            <span className="text-white font-bold text-xl">Career Path</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {user && user.username && (
              <>
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                        ${location.pathname === item.path
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* User Menu */}
                <div className="relative ml-4 flex items-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    {getUserInitial()}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            )}

            {/* Login/Register Buttons (only shown on home page for non-authenticated users) */}
            {!user && location.pathname === '/' && (
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/login')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Register
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
