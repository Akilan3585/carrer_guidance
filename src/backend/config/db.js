const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/career_game_db';
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better query performance
    const User = require('../models/User');
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ "gameProgress.completedPaths": 1 });
    await User.collection.createIndex({ "gameProgress.checkpoints.pathId": 1 });
    await User.collection.createIndex({ "gameProgress.checkpoints.completed": 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Retry connection with exponential backoff
    const retryDelay = Math.min(1000 * Math.pow(2, mongoose.connection.retryCount || 0), 60000);
    console.log(`Retrying connection in ${retryDelay/1000} seconds...`);
    setTimeout(connectDB, retryDelay);
  }
};

module.exports = connectDB;
