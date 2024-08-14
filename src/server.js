// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./api/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rule-engine', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
