const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// Filter results based on category (/api/search)
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const { category, name } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (error) {
        console.error("Error searching gifts:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
