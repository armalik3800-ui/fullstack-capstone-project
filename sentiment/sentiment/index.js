const natural = require('natural');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/sentiment', (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required for sentiment analysis' });
        }

        const Analyzer = natural.SentimentAnalyzer;
        const stemmer = natural.PorterStemmer;
        const analyzer = new Analyzer("English", stemmer, "afinn");

        const analysisResult = analyzer.getSentiment(text.split(' '));
        res.json({ sentiment: analysisResult });
    } catch (error) {
        console.error("Error processing sentiment:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Sentiment service running on port ${port}`);
});

module.exports = app;
