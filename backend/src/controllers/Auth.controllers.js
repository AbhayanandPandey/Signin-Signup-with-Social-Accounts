const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

 const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const tokenPayload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('TokenData', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000 * 24
        });

        res.redirect(`${process.env.CLIENT_URL}/dashboard`);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
 const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            profilePic: existingUser.ProfilePic,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('TokenData', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000 * 24
        });

        res.redirect(`${process.env.CLIENT_URL}/dashboard`);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
 const logout = async (req, res) => {
    try {
        res.clearCookie('TokenData');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

 const getUser = async (req, res) => {
    const token = req.cookies.TokenData;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, profilePic } = decoded;
    res.json({ name, email, profilePic });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}
