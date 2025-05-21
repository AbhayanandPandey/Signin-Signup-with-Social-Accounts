const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

require('./config/passport');

const passport = require('passport');
const faceAuth = require('./routes/socialAuth.routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
require('./config/db');
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

const AuthData = require('./routes/Auth.routes');
app.use('/api/auth', AuthData);

// Social authentication

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', faceAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
