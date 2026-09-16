const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');
const { ObjectId } = require('mongodb');

// Get all gifts (/api/gifts)
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (error) {
        console.error("Error fetching gifts:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single gift by ID (/api/gifts/:id)
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gift = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        res.json(gift);
    } catch (error) {
        console.error("Error fetching gift details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
