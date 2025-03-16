const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true
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
    checkpoints: [{
      pathId: {
        type: String,
        enum: ['Full Stack', 'AI/ML', 'ECE']
      },
      checkpointId: String,
      score: Number,
      completed: {
        type: Boolean,
        default: false
      }
    }]
  },
  careerRecommendation: {
    path: {
      type: String,
      enum: ['Full Stack', 'AI/ML', 'ECE']
    },
    level: {
      type: String,
      enum: ['Junior', 'Mid-Level', 'Senior']
    },
    recommendation: String,
    skillLevels: {
      'Full Stack': { type: Number, default: 0 },
      'AI/ML': { type: Number, default: 0 },
      'ECE': { type: Number, default: 0 }
    }
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("User", UserSchema);
