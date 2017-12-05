const express = require("express");
const path = require("path");
const bannerCtrl = require("../controllers/banner");
const {ensureAuthenticated} = require('./auth');

const router = express.Router();
const PUBLIC_PATH = `${__dirname}/../../dist/`;

/**
 *  Returns all banners
 */
router.get("/", ensureAuthenticated, (req, res) => {
  res.json(bannerCtrl.getBannersArray());
});

/**
 *  Inserts a new banner into existing ones
 */
router.post("/", ensureAuthenticated, (req, res) => {
  bannerCtrl.insertBanner(req.body).then(banner => {
    res.status(201).send({banner});
  });
});

/**
 *  Delete given banner
 */
router.delete("/:id", ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  try {
    bannerCtrl.deleteBanner(id);
    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/**
 *  Returns a random banner given the current date
 */
router.get("/random", (req, res) => {
  bannerCtrl
    .getRandomBanner(req.query)
    .then(imgPath => {
      if (req.query.noredirect) {
        const absolutePath = path.join(PUBLIC_PATH, imgPath);
        res.sendFile(absolutePath);
      } else {
        res.redirect(imgPath);
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).send(e.message);
    });
});

/**
 *  Handles banner picture upload
 */
router.post("/upload", ensureAuthenticated, (req, res) => {
  const bannerFolder = `${PUBLIC_PATH}/assets/banners/`;
  req.pipe(req.busboy);

  req.busboy.on("file", (fieldname, file, filename) => {

    bannerCtrl
      .uploadBanner(bannerFolder, fieldname, file, filename)
      .then(newFilename => res.send({data: newFilename}));
  });
});

module.exports = router;
