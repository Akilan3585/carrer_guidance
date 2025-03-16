import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.js';
import { useAuth } from './context/AuthContext.js';
import './App.css';
import Navbar from "./components/UI/Navbar.js";
import LandingPage from "./components/UI/LandingPage.js";
import Game from "./pages/Game.js";
import CareerGuidance from "./pages/CareerGuidance.js";
import CareerResults from "./pages/CareerResults.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Profile from "./components/Profile/Profile.js";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component - Redirects to game if already logged in
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/game" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/game" element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        } />
        <Route path="/career-guidance" element={
          <ProtectedRoute>
            <CareerGuidance />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/results" element={
          <ProtectedRoute>
            <CareerResults />
          </ProtectedRoute>
        } />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
