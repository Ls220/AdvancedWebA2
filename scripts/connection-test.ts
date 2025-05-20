import { MongoClient } from 'mongodb';
import dns from 'dns';
import { promisify } from 'util';
import dotenv from 'dotenv';

// REMOVE CODE IS REDUNDANT AS NO HOSTING WAS DONE
dotenv.config();

const dnsLookup = promisify(dns.lookup);
const dnsResolve = promisify(dns.resolve);

async function testConnection() {
    console.log('Starting MongoDB Connection Diagnostics...\n');

    // 1. Check environment variable
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI is not defined in environment variables');
        return;
    }
    console.log('✅ MONGODB_URI is defined');

    try {
        const url = new URL(uri);
        console.log('✅ Connection string format is valid');
        console.log(`Host: ${url.hostname}`);
        console.log(`Database: ${url.pathname.substr(1)}`);
    } catch (error) {
        console.error('❌ Invalid connection string format:', error);
        return;
    }
    try {
        const hostname = uri.split('@')[1].split('/')[0];
        console.log(`\nTesting DNS test for ${hostname}...`);
        
        const dnsResult = await dnsLookup(hostname);
        console.log('✅ DNS Test successful');
        console.log(`IP Address: ${dnsResult.address}`);

        const records = await dnsResolve(hostname, 'A');
        console.log('DNS A Records:', records);
    } catch (error) {
        console.error('❌ DNS Resolution failed:', error);
    }


    console.log('\nAttempting MongoDB connection...');
    const client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
    });

    try {
        await client.connect();
        console.log('✅ Successfully connected to MongoDB');
        

        const db = client.db();
        const collections = await db.listCollections().toArray();
        console.log('\nAvailable collections:', collections.map(c => c.name));
        
        await client.close();
        console.log('✅ Connection closed successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection failed:', error);
    }
}

testConnection().catch(console.error); 