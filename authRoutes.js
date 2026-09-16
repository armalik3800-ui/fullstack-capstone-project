const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login route using findOne to locate the current user in the database
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Locate the user using findOne
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, email: user.email, name: user.name });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
