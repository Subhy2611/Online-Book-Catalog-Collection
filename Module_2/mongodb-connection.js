const { MongoClient } = require('mongodb');

// Connection URL string
const url = 'mongodb://localhost:27017/';

async function run() {
    let client; // Declare client outside try-catch to access it in finally block

    try {
        // Logging before attempting connection
        console.log("Attempting to connect to MongoDB...");

        // Creating a new MongoClient instance
        client = new MongoClient(url, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds if the server is not available
        });

        // Connecting to MongoDB Server
        await client.connect();
        console.log("Connected successfully to MongoDB Server using Node.js Driver for MongoDB");

        // Selecting Database
        const dbname = "OrionOnlineBooksDB";
        const db = client.db(dbname);

        // Get the "OrionOnlineBooksCollection" Collection
        const collection = db.collection('OrionOnlineBooksCollection');

        // Find all the documents in the "OrionOnlineBooksCollection" Collection
        const docs = await collection.find().toArray();
        console.log("Our Node.js Script found all these records:");
        console.log(docs);
    } catch (err) {
        console.error("Error while connecting to MongoDB Server:", err);
    } finally {
        // Close the client connection in finally block
        if (client) {
            await client.close();
            console.log("Connection closed");
        }
    }
}
//Run the Script
run();
