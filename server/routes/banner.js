const express 		= require("express");
const bannerCtrl 	= require('../controllers/banner');

const router = express.Router();
const PUBLIC_PATH = `${__dirname}/../../dist/`;

/**
 *	Returns all banners
 */
router.get("/", (req, res) => {
    res.json(bannerCtrl.getBannersArray());
});
 
/**
 *	Inserts a new banner into existing ones
 */
router.post("/", (req, res) => {

	bannerCtrl.insertBanner(req.body).then((banner) => {
		res.status(201).send({banner});
	});
});

/**
 *	Delete given banner
 */
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	try {
		bannerCtrl.deleteBanner(id);
		res.sendStatus(200);	
	} catch (e){
		res.status(404).send(e.message)
	}
});

/**
 *	Returns a random banner given the current date
 */
router.get('/random', (req, res) => {

	bannerCtrl.getRandomBanner(PUBLIC_PATH, req.query).then((img) => {
		res.sendFile(img);
	});
});

/**
 *	Handles banner picture upload
 */
router.post("/upload", (req, res) => {

	const bannerFolder = `${PUBLIC_PATH}/assets/banners/`;

	req.pipe(req.busboy);

    req.busboy.on("file", (fieldname, file, filename) => {

    	console.log('jecrois');

		bannerCtrl.uploadBanner(bannerFolder, fieldname, file, filename).then((newFilename) => {

			res.send({
	            data: newFilename
	        });
		});
    });
});

module.exports = router;
