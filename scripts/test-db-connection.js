require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB Atlas!');
    console.log('Connection details:', {
      host: mongoose.connection.host,
      database: mongoose.connection.name
    });
    process.exit(0);
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    process.exit(1);
  }
}

testConnection(); 