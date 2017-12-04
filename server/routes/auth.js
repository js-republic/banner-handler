const passport = require("passport");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const session = require("express-session");
const axios = require('axios');
const env = require('../env');

const GOOGLE_SCOPE = [
  "https://www.googleapis.com/auth/plus.login",
  "https://www.googleapis.com/auth/admin.directory.group.readonly"
];

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, done) => {
    isUserBelongToAllowedGroup()
      .then(() => {
        return done(null, {
          id: profile.id,
          name: profile.displayName,
          avatar: profile.photos.shift().value
        });
      })
      .catch(e => done(e));
  })
);

router.get("/user", (req, res) => res.json(req.user));
router.get("/google", passport.authenticate("google", {scope: GOOGLE_SCOPE}));
router.get("/google/callback", passport.authenticate("google", {successRedirect: '/main', failureRedirect: "/login"}));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function isUserBelongToAllowedGroup(accessToken, userID) {
  return axios.get(`https://www.googleapis.com/admin/directory/v1/groups?userKey=${userID}`, {
    "headers": {
      "Authorization": `Bearer ${accessToken}`
    }
  })
    .then(({data: {groups}}) => {
      const foundGroup = groups.find(group => group.email === env.GOOGLE_ALLOWED_GROUP);
      if (!foundGroup) {
        throw new Error(`The user doesn't belong to ${env.GOOGLE_ALLOWED_GROUP}`);
      }
      return foundGroup;
    })
}

module.exports = {
  handleAuthRoutes(app) {
    app.use(session({
      name: 'JSESSION',
      cookie: {maxAge: 60000},
      secret: 'js-republic secret',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/auth", router);
  },
  ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};
