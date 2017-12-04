const envalid = require('envalid');

module.exports = envalid.cleanEnv(process.env, {
  GOOGLE_CLIENT_ID : envalid.str(),
  GOOGLE_CLIENT_SECRET : envalid.str(),
  GOOGLE_CALLBACK_URL: envalid.url(),
  GOOGLE_ALLOWED_GROUP: envalid.str(),
  PORT: envalid.port()
});
