const auth = require("http-auth");
const basic = auth.basic({
  realm: "Galactic Area",
  file: __dirname + "/../users.htpasswd"
});

module.exports = {
  secured() {
    return auth.connect(basic)
  }
};
