const { MongoClient } = require('mongodb');

const USER = '';
const PASSWORD = '';
const CLUSTER = 'cluster0.grtfp.mongodb.net';
const DATABASE = '';

// Connection URI
const uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}/${DATABASE}?poolSize=5&writeConcern=majority&retryWrites=true`;

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db(DATABASE).command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
