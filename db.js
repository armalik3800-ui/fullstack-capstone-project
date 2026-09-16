const { MongoClient } = require('mongodb');

let db = null;
let client = null;

async function connectToDatabase() {
    if (db) {
        return db;
    }
    try {
        const url = process.env.MONGO_URL;
        if (!url) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        client = new MongoClient(url);
        await client.connect();
        db = client.db("giftlink");
        return db;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
