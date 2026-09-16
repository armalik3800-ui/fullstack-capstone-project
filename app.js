const express = require('express');
const app = express();
const searchRoutes = require('./searchRoutes');

app.use(express.json());

// Route serving /api/search
app.use('/api/search', searchRoutes);

module.exports = app;
