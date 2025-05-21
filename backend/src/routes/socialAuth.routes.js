
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const User = require('../models/user.model');
const app = express();

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

        res.redirect('https://signin-signup-with-social-accounts-1.onrender.com/dashboard');
    }
);


//Github Authentication

router.get('/github', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: 'user:email',
    prompt: 'consent',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

router.get('/github/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = tokenRes.data.access_token;
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const emailRes = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const primaryEmailObj = emailRes.data.find(email => email.primary && email.verified);
    const primaryEmail = primaryEmailObj ? primaryEmailObj.email : null;

    if (!primaryEmail) {
      return res.status(400).send("No verified primary email found for GitHub user.");
    }

    let user = await User.findOne({ githubId: userRes.data.id });

    if (!user) {
      user = new User({
        githubId: userRes.data.id,
        name: userRes.data.name || userRes.data.login,
        email: primaryEmail,
        profilePic: userRes.data.avatar_url,
      });

      await user.save();
    }

    const userData = {
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    };

    const jwtToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('TokenData', jwtToken, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.redirect(`https://signin-signup-with-social-accounts-1.onrender.com/dashboard`);
  } catch (error) {
    console.error("GitHub auth error:", error.message);
    res.status(500).send('Authentication failed.');
  }
});

//Google Authentication

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: process.env.CLIENT_URL,
    }),
    (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(401).send('User not found');
        }

        const tokenPayload = {
            id: user.googleId,
            name: user.name,
            email: user.email,
            profilePic: user.photos?.[0]?.value || 'https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180'
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('TokenData', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000 // 1 day
        });

         res.redirect(`https://signin-signup-with-social-accounts-1.onrender.com/dashboard`);
    }
);


module.exports = router;
