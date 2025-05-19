const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB connected');
    await User.syncIndexes();
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
