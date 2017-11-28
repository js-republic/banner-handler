const express = require("express");
const compress = require("compression");
const busboy = require("connect-busboy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const serveStatic = require("serve-static");
const env = require("./env");
const bannerRouter = require("./routes/banner");
const {handleAuthRoutes} = require("./routes/auth");

const app = express();

const staticPath = path.join(__dirname, "../dist");

app.disable("x-powered-by");
app.use(compress());
app.use(busboy());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use("/banner", bannerRouter);
handleAuthRoutes(app);
app.use(serveStatic(staticPath));
app.get("*", (req, res) => res.sendFile(`${staticPath}/index.html`));


app.listen(env.PORT, () => {
  console.log("Banner handler just started on " + env.PORT);
});
