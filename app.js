const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');
const newsRoutes = require('./routes/newsRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users/auth', authRoutes);
app.use('/users/preferences', preferenceRoutes);
app.use('/users/news', newsRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("Server is up and running....🚀");
});

module.exports = app;
