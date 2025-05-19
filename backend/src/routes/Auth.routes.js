const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { register, login, logout, getUser } = require('../controllers/Auth.controllers');
const {isAuthenticated} = require('../middleware/isAuthenticated');
dotenv.config();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/user', isAuthenticated, getUser);

module.exports = router;
