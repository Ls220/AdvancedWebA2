require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  console.log('Starting MongoDB connection test...');
  console.log('MongoDB URI format:', process.env.MONGODB_URI?.split('@')[0].split(':')[0] + ':****@' + process.env.MONGODB_URI?.split('@')[1]);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    });

    console.log('Connection successful!');
    console.log('Connected to database:', mongoose.connection.name);
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Host:', mongoose.connection.host);

    // Try to create a test document
    const Test = mongoose.model('Test', new mongoose.Schema({ test: String }));
    await Test.create({ test: 'test' });
    console.log('Successfully created test document');
    
    // Clean up test document
    await Test.deleteMany({});
    console.log('Successfully cleaned up test document');

    await mongoose.connection.close();
    console.log('Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Connection test failed with error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      stack: error.stack
    });
    process.exit(1);
  }
}

testConnection(); 