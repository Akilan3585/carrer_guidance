const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gameProgress: {
    score: {
      type: Number,
      default: 0
    },
    completedPaths: [{
      type: String,
      enum: ['Full Stack', 'AI/ML', 'ECE']
    }],
    currentDomain: {
      type: String,
      enum: ['Full Stack', 'AI/ML', 'ECE', ''],
      default: ''
    },
    achievements: [{
      type: String,
      enum: [
        // Full Stack achievements
        'html_master',
        'css_guru',
        'js_ninja',
        'full_stack_beginner',
        'full_stack_intermediate',
        'full_stack_expert',
        
        // AI/ML achievements
        'neural_networks_explorer',
        'ml_algorithms_master',
        'data_science_pro',
        'ai_beginner',
        'ai_intermediate',
        'ai_expert',
        
        // ECE achievements
        'digital_basics_master',
        'electronics_wizard',
        'computer_architect',
        'ece_beginner',
        'ece_intermediate',
        'ece_expert'
      ]
    }],
    checkpointScores: {
      'Full Stack': {
        type: Map,
        of: Number,
        default: new Map()
      },
      'AI/ML': {
        type: Map,
        of: Number,
        default: new Map()
      },
      'ECE': {
        type: Map,
        of: Number,
        default: new Map()
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Calculate domain-specific scores
userSchema.methods.getDomainScore = function(domain) {
  const checkpointScores = this.gameProgress.checkpointScores[domain];
  if (!checkpointScores) return 0;
  
  return Array.from(checkpointScores.values()).reduce((sum, score) => sum + score, 0);
};

// Get career recommendation based on domain and score
userSchema.methods.getCareerRecommendation = function(domain) {
  const score = this.getDomainScore(domain);
  
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

  if (score >= 24) return recommendations[domain].high;
  if (score >= 15) return recommendations[domain].medium;
  return recommendations[domain].low;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
