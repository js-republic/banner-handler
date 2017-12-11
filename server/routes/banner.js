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
  bannerCtrl.getBannersArray().then(banners => {
    res.json(banners);
  });
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
 *  Get banner picture from S3
 */
router.get("/img/path", ensureAuthenticated, (req, res) => {

  const s3Path = req.query.s3Path;

  try {

    const url = bannerCtrl.getPictureUrlFromS3Path(s3Path);

    res.status(200).send({data: url});

  } catch (e) {
    res.status(404).send(e.message);
  }
});

/**
 *  Returns a random banner given the current date
 */
router.get("/random", (req, res) => {

  bannerCtrl.getBannersArray().then(bannersList => {

    if ( bannersList.length > 0 ) {

      bannerCtrl
        .getRandomBanner(req.query)
        .then(imgPath => {
          res.redirect(imgPath);
        })
        .catch(e => {
          console.error(e);
          res.status(500).send(e.message);
        });

    } else {
      res.sendStatus(404);
    }
  });
});

/**
 *  Handles banner picture upload
 */
router.post("/upload", ensureAuthenticated, (req, res) => {

  const bannerFolder = `assets/banners/`;
  req.pipe(req.busboy);

  req.busboy.on("file", (fieldname, file, filename) => {

    bannerCtrl
      .uploadBanner(bannerFolder, fieldname, file, filename)
      .then(newFilename => res.send({data: newFilename}))
      .catch(e => console.log('e', e));
  });
});

module.exports = router;
