const express = require("express");
const path = require("path");
const bannerCtrl = require("../controllers/banner");
const {ensureAuthenticated} = require('./auth');

const router = express.Router();
const PUBLIC_PATH = `${__dirname}/../../dist/`;

/**
 *  Returns all banners
 */
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const banners = await bannerCtrl.getBannersArray();
    res.json(banners);
  } catch(e) {
    res.status(500).send(e.message);
  }
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

  bannerCtrl.deleteBanner(id).then(() => {
    res.status(200).send({status: 'success'});

  }).catch(e => {
    res.status(404).send(e.message);
  });
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
router.get("/random", async (req, res) => {

  const bannersList = await bannerCtrl.getBannersArray();

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
      .catch(e => {
        console.error('Error during uploading', e);
        res.status(500).send(e.message);
      });
  });
});

module.exports = router;
