const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user.model');


//facebook authentication
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'picture.type(large)'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ facebookId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || 'No public email',
        profilePic: profile.photos?.[0]?.value || null,
      });

      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
