const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Career path data with checkpoints and success stories
const careerPaths = {
  'Full Stack': {
    icon: '💻',
    skills: ['HTML fundamentals', 'CSS styling', 'JavaScript frameworks'],
    description: 'Master web development from frontend to backend',
    checkpoints: [
      { id: 'fs1', question: 'HTML fundamentals', points: 10 },
      { id: 'fs2', question: 'CSS styling', points: 10 },
      { id: 'fs3', question: 'JavaScript frameworks', points: 10 }
    ],
    successStories: [
      {
        name: 'Sarah Chen',
        role: 'Microsoft Tech Lead',
        journey: 'Started in high school computer club',
        impact: 'Now leads 20 developers on Microsoft Teams features'
      },
      {
        name: 'Alex Rodriguez',
        role: 'Startup Founder',
        journey: 'Self-taught through online courses',
        impact: 'Founded TechFlow Solutions, helping small businesses digitize'
      }
    ],
    preparation: {
      early: ['Join coding clubs', 'Take CS electives', 'Participate in hackathons'],
      projects: ['Social media platforms', 'E-commerce websites', 'Mobile apps']
    }
  },
  'AI/ML': {
    icon: '🤖',
    skills: ['Neural Networks', 'Learning types', 'Programming languages'],
    description: 'Explore artificial intelligence and machine learning',
    checkpoints: [
      { id: 'ai1', question: 'Neural Networks', points: 10 },
      { id: 'ai2', question: 'Learning types', points: 10 },
      { id: 'ai3', question: 'Programming languages', points: 10 }
    ],
    successStories: [
      {
        name: 'Priya Patel',
        role: 'DeepMind Researcher',
        journey: 'Math competition winner',
        impact: 'Developing healthcare AI models'
      },
      {
        name: 'James Wilson',
        role: 'OpenAI Lead',
        journey: 'Started in robotics club',
        impact: 'Making AI accessible to everyone'
      }
    ],
    preparation: {
      early: ['Focus on math competitions', 'Join robotics club', 'Learn Python'],
      projects: ['AI chatbots', 'Facial recognition', 'Recommendation engines']
    }
  },
  'ECE': {
    icon: '⚡',
    skills: ['Digital basics', 'Electronic components', 'Computer architecture'],
    description: 'Build the future of hardware and electronics',
    checkpoints: [
      { id: 'ece1', question: 'Digital basics', points: 10 },
      { id: 'ece2', question: 'Electronic components', points: 10 },
      { id: 'ece3', question: 'Computer architecture', points: 10 }
    ],
    successStories: [
      {
        name: 'Akiko Tanaka',
        role: 'Samsung IoT Pioneer',
        journey: 'DIY electronics since 14',
        impact: 'Leading energy-saving IoT innovations'
      },
      {
        name: 'David Kumar',
        role: 'Intel Chip Designer',
        journey: 'Started with Arduino',
        impact: 'Designing processors used in millions of devices'
      }
    ],
    preparation: {
      early: ['Join electronics club', 'Build DIY electronics', 'Learn Arduino'],
      projects: ['IoT devices', 'Smart home systems', 'Embedded controllers']
    }
  }
};

// Authentication endpoints
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gameProgress: {
        score: 0,
        completedPaths: [],
        checkpoints: []
      },
      careerRecommendation: {
        skillLevels: {
          'Full Stack': 0,
          'AI/ML': 0,
          'ECE': 0
        }
      }
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    // Return user data (excluding password)
    const userData = newUser.toObject();
    delete userData.password;
    res.status(201).json({ user: userData, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    // Return user data (excluding password)
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route to get user profile
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// API Routes
app.get("/api/career-paths", (req, res) => {
  res.json(careerPaths);
});

// Protected route for career guidance
app.post("/api/career-guidance", verifyToken, async (req, res) => {
  try {
    const { skillPoints, checkpointId, pathId } = req.body;
    
    if (!skillPoints) {
      return res.status(400).json({ error: 'Skill points are required' });
    }

    // Get user for updating progress
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate dominant path and skill levels
    const paths = Object.keys(skillPoints);
    const dominantPath = paths.reduce((a, b) => skillPoints[a] > skillPoints[b] ? a : b);
    const score = skillPoints[dominantPath];
    
    // Update checkpoint progress if provided
    if (checkpointId && pathId) {
      const checkpointExists = user.gameProgress.checkpoints.some(
        cp => cp.checkpointId === checkpointId && cp.pathId === pathId
      );

      if (!checkpointExists) {
        user.gameProgress.checkpoints.push({
          pathId,
          checkpointId,
          score: skillPoints[pathId] || 0,
          completed: true
        });
      }
    }
    
    // Update user's game progress
    user.gameProgress.score = Math.max(user.gameProgress.score, score);
    if (!user.gameProgress.completedPaths.includes(dominantPath)) {
      user.gameProgress.completedPaths.push(dominantPath);
    }

    // Update career recommendation
    user.careerRecommendation = {
      path: dominantPath,
      level: score >= 24 ? 'Senior' : score >= 15 ? 'Mid-Level' : 'Junior',
      recommendation: getCareerRecommendation(dominantPath, score),
      skillLevels: {
        'Full Stack': (skillPoints['Full Stack'] / 30) * 100,
        'AI/ML': (skillPoints['AI/ML'] / 30) * 100,
        'ECE': (skillPoints['ECE'] / 30) * 100
      }
    };

    await user.save();

    const response = {
      path: dominantPath,
      skills: careerPaths[dominantPath].skills,
      description: careerPaths[dominantPath].description,
      recommendation: user.careerRecommendation.recommendation,
      successStories: careerPaths[dominantPath].successStories,
      preparation: careerPaths[dominantPath].preparation,
      skillLevels: user.careerRecommendation.skillLevels,
      gameProgress: user.gameProgress
    };

    res.json(response);
  } catch (error) {
    console.error('Error in career guidance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to get career recommendation
function getCareerRecommendation(path, score) {
  switch (path) {
    case 'Full Stack':
      return score >= 24 ? 'Senior Full Stack Developer' :
             score >= 15 ? 'Web Developer' :
             'Junior Frontend Developer';
    case 'AI/ML':
      return score >= 24 ? 'AI Research Scientist' :
             score >= 15 ? 'Machine Learning Engineer' :
             'Data Analyst';
    case 'ECE':
      return score >= 24 ? 'Hardware Architect' :
             score >= 15 ? 'Electronics Engineer' :
             'Circuit Designer';
    default:
      return 'Career path not recognized';
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: 'ok' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
