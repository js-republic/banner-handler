const passport = require("passport");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const session = require("express-session");
const MemoryStore = require("session-memory-store")(session);

const env = require('../env');

const {userIds} = env.GOOGLE_ALLOWED_USERS;

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, {
      id: profile.id,
      name: profile.displayName,
      avatar: profile.photos.shift().value
    });
  })
);

router.get("/user", (req, res) => res.json(req.user));
router.get("/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/plus.login"]}));
router.get("/google/callback", passport.authenticate("google", {successRedirect: '/main', failureRedirect: "/login"}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
  handleAuthRoutes(app) {
    app.use(session({
      name: 'JSESSION',
      cookie: {maxAge: 60000},
      secret: 'js-republic secret',
      store: new MemoryStore({}),
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
