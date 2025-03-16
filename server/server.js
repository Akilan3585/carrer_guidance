const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/career_game_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Authentication Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with initial game progress
    const user = new User({
      username,
      email,
      password,
      gameProgress: {
        score: 0,
        completedPaths: [],
        currentDomain: '',
        achievements: []
      }
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        gameProgress: user.gameProgress
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        gameProgress: user.gameProgress
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Game Progress Routes
app.put('/api/progress', authenticateToken, async (req, res) => {
  try {
    const { score, completedPaths, currentDomain, achievements } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'gameProgress.score': score,
          'gameProgress.currentDomain': currentDomain
        },
        $addToSet: {
          'gameProgress.completedPaths': { $each: completedPaths || [] },
          'gameProgress.achievements': { $each: achievements || [] }
        }
      },
      { new: true }
    );

    res.json({ gameProgress: updatedUser.gameProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
});

// Profile Routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate career recommendations based on scores
    const recommendations = {};
    const domains = ['Full Stack', 'AI/ML', 'ECE'];
    
    domains.forEach(domain => {
      const domainScore = user.gameProgress.completedPaths.includes(domain) ? user.gameProgress.score : 0;
      let recommendation;
      
      if (domainScore >= 24) {
        recommendation = domain === 'Full Stack' ? 'Senior Full Stack Developer' :
                        domain === 'AI/ML' ? 'AI Research Scientist' : 'Hardware Architect';
      } else if (domainScore >= 15) {
        recommendation = domain === 'Full Stack' ? 'Web Developer' :
                        domain === 'AI/ML' ? 'Machine Learning Engineer' : 'Electronics Engineer';
      } else {
        recommendation = domain === 'Full Stack' ? 'Junior Frontend Developer' :
                        domain === 'AI/ML' ? 'Data Analyst' : 'Circuit Designer';
      }
      
      recommendations[domain] = {
        score: domainScore,
        recommendation,
        completed: user.gameProgress.completedPaths.includes(domain)
      };
    });

    res.json({
      user: {
        ...user.toObject(),
        recommendations
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Achievement Routes
app.post('/api/achievements', authenticateToken, async (req, res) => {
  try {
    const { achievementId, domain } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add achievement if not already earned
    if (!user.gameProgress.achievements.includes(achievementId)) {
      user.gameProgress.achievements.push(achievementId);
      await user.save();
    }

    res.json({ achievements: user.gameProgress.achievements });
  } catch (error) {
    res.status(500).json({ message: 'Error updating achievements', error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
