const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieSession = require('cookie-session');
const env = require('../env');

const GOOGLE_SCOPE = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];
const HALF_HOUR = 30 * 60 * 1000;

function isUserBelongToAllowedUserList(profile) {
  const email = profile.emails[0].value;
  const allowedMails = env.GOOGLE_ALLOWED_MAILS.mails;

  return new Promise((resolve, reject) => {
    if (allowedMails.indexOf(email) !== -1) {
      resolve({
        id: profile.id,
        name: profile.displayName,
        email,
        avatar: profile.photos.shift().value
      });
    } else {
      reject();
    }
  })
}

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, done) => {

    isUserBelongToAllowedUserList(profile)
      .then(user => done(null, user))
      .catch(e => done(e));
  })
);

router.get('/user', (req, res) => res.json(req.user));
router.get('/google', passport.authenticate('google', {scope: GOOGLE_SCOPE}));
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/main', failureRedirect: '/login'}));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = {
  handleAuthRoutes(app) {
    app.use(cookieSession({
      name:"session",
      maxAge : HALF_HOUR,
      secret : env.COOKIE_SECRET
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', router);
  },
  ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};
