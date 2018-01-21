const envalid = require('envalid');

module.exports = envalid.cleanEnv(process.env, {
  GOOGLE_CLIENT_ID : envalid.str(),
  GOOGLE_CLIENT_SECRET : envalid.str(),
  GOOGLE_CALLBACK_URL: envalid.url(),
  GOOGLE_ALLOWED_MAILS: envalid.json(),
  COOKIE_SECRET:envalid.str(),
  AWS_ACCESS_KEY_ID: envalid.str(),
  AWS_SECRET_ACCESS_KEY: envalid.str(),
  AWS_S3_BUCKET: envalid.str(),
  PORT: envalid.port(),
});
