const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const tokenPayload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: 'https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180',

        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('TokenData', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000 * 24,
        });

        res.status(201).json({ message: 'Registration successful', user: tokenPayload });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid user' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const tokenPayload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            profilePic: 'https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180',
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('TokenData', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000 * 24,
        });

        res.status(200).json({ message: 'Login successful', user: tokenPayload });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const logout = async (req, res) => {
    try {
        res.clearCookie('TokenData');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { name, email } = req.user;
        const user = await User.findOne({ email });
        const profilePic = user.profilePic
        res.json({ name, email, profilePic });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get user', error: err.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    getUser
}
