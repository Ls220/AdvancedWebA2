require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
const { promisify } = require('util');

const lookup = promisify(dns.lookup);
const resolve4 = promisify(dns.resolve4);
const resolveSrv = promisify(dns.resolveSrv);

async function diagnoseConnection() {
  console.log('\n=== MongoDB Connection Diagnostics ===\n');
  
  // 1. Check environment variables
  console.log('1. Checking environment variables...');
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined');
    process.exit(1);
  }
  console.log('✓ MONGODB_URI is defined');
  
  // 2. Parse connection string
  console.log('\n2. Analyzing connection string...');
  try {
    const [protocol, rest] = uri.split('://');
    const [credentials, hostPart] = rest.split('@');
    const [username] = credentials.split(':');
    const [host] = hostPart.split('?')[0].split('/');
    
    console.log(`Protocol: ${protocol}`);
    console.log(`Username: ${username}`);
    console.log(`Host: ${host}`);
    console.log('✓ Connection string format is valid');

    // Additional DNS debugging
    console.log('\n3. Detailed DNS Resolution Tests...');
    
    // Try different DNS servers
    const servers = [
      { name: 'Google DNS', ip: '8.8.8.8' },
      { name: 'Cloudflare DNS', ip: '1.1.1.1' }
    ];

    for (const server of servers) {
      console.log(`\nTesting with ${server.name} (${server.ip})...`);
      dns.setServers([server.ip]);
      
      try {
        console.log(`Testing A records...`);
        const hosts = host.split(',');
        for (const h of hosts) {
          const cleanHost = h.split(':')[0];
          try {
            const aRecords = await resolve4(cleanHost);
            console.log(`✓ A records found for ${cleanHost}:`, aRecords);
          } catch (err) {
            console.log(`❌ Failed to resolve A records for ${cleanHost}:`, err.code);
          }
        }
      } catch (err) {
        console.log(`❌ Failed to resolve A records:`, err.code);
      }
    }
  } catch (error) {
    console.error('❌ Invalid connection string format:', error);
    return;
  }

  // 4. Test connection
  console.log('\n4. Testing MongoDB connection...');
  try {
    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 0
    };

    console.log('Attempting connection with options:', JSON.stringify(options, null, 2));
    
    mongoose.set('debug', true); // Enable debug logging
    
    await mongoose.connect(uri, options);
    console.log('✓ Connection successful!');
    console.log(`Connected to: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`State: ${mongoose.connection.readyState}`);
    
    // Test basic operations
    console.log('\n5. Testing basic operations...');
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await Test.findOne(); // Simple read test
    console.log('✓ Basic query successful');
    
    await mongoose.connection.close();
    console.log('✓ Connection closed successfully');
  } catch (error) {
    console.error('❌ Connection failed:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      stack: error.stack
    });
  }
}

diagnoseConnection().catch(console.error); 