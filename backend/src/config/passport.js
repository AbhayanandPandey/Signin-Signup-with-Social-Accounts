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

//Google authentication

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            return done(null, existingUser);
        }
        const profilePic = profile.photos && profile.photos.length > 0
        ? profile.photos[0].value
        : 'https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180';
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profilePic
        });

        await newUser.save();
        done(null, newUser);
    } catch (err) {
        done(err, null);
    }
}));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
