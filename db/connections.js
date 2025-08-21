const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const dbName = process.env.NODE_ENV === 'test' ? 'newsApiTest' : 'newsApi';
        await mongoose.connect(process.env.MONGO_URI, {
            dbName
        });

        console.log(`MongoDB connected to ${dbName} database`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
