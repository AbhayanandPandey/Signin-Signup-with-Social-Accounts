const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
require('./config/db');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const AuthData = require('./routes/Auth.routes');

app.use('/api/auth', AuthData);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
