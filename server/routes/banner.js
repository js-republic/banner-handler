const express = require('express');
const bannerCtrl = require('../controllers/banner');
const {ensureAuthenticated} = require('./auth');

const router = express.Router();

/**
 *  Returns all banners
 */
router.get('/', ensureAuthenticated, (req, res) => {
  bannerCtrl.getBannersArray()
    .then(banners => res.json(banners))
    .catch(e => res.status(500).send(e.message));
});

/**
 *  Inserts a new banner into existing ones
 */
router.post('/', ensureAuthenticated, (req, res) => {
  bannerCtrl.insertBanner(req.body)
    .then(banner => res.status(201).send({banner}))
    .catch(e => res.status(500).send(e.message));
});

/**
 *  Delete given banner
 */
router.delete('/:id', ensureAuthenticated, (req, res) => {
  bannerCtrl.deleteBanner(req.params.id)
    .then(() => res.status(200).send({status: 'success'}))
    .catch(e => res.status(404).send(e.message));
});

/**
 *  Get banner picture from S3
 */
router.get('/img/path', ensureAuthenticated, (req, res) => {
  try {
    const url = bannerCtrl.getPictureUrlFromS3Path(req.query.s3Path);
    res.status(200).send({data: url});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/**
 *  Returns a random banner given the current date
 */
router.get('/random', (req, res) => {
  bannerCtrl.getBannersArray()
    .then(banners => (banners.length === 0) ?
      res.sendStatus(404) :
      bannerCtrl.getRandomBanner(req.query)
    )
    .then(imgPath => res.redirect(imgPath))
    .catch(e => {
      console.error(e);
      res.status(500).send(e.message);
    });
});

/**
 *  Handles banner picture upload
 */
router.post('/upload', ensureAuthenticated, (req, res) => {

  const bannerFolder = `assets/banners/`;
  req.pipe(req.busboy);

  req.busboy.on('file', (fieldname, file, filename) => {

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
