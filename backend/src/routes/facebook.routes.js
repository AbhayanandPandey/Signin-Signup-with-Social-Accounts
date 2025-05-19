
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Facebook authentication routes

router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        const { name, email, image } = req.user;

        const tokenPayload = {
            id: req.user.facebookId,
            name: name,
            email: email,
            profilePic: image || 'https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180'

        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('TokenData', token, {
            httpOnly: false,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.redirect('http://localhost:5173/dashboard');
    }
);


module.exports = router;