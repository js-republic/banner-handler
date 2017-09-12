const express = require("express");
const compress = require("compression");
const busboy = require("connect-busboy");
const bodyParser = require("body-parser");
const bannerRouter = require("./routes/banner");
const auth = require("./auth");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../dist");

app.disable("x-powered-by");
app.use(compress());
app.use(busboy());
app.use(bodyParser({ extended: true }));

// Routes
app.use("/banner", bannerRouter);
app.use(express.static(staticPath));
app.get("*", auth.secured(), (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

app.listen(port, () => {
  console.log("Banner handler just started on " + port);
});
