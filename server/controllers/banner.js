const fs        = require('fs');
const moment    = require('moment');
const S3FS      = require('s3fs');
const env       = require('../env');

const awsOptions = {
  endpoint: 's3-eu-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'eu-central-1',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
};

class BannerController {

	getBannersArray() {
        return this.getBanners().then(this.getValues);
	}

    getBanners() {

        return this.getFs().readFile('/banners.json').then(buffer => {

            try {
                return JSON.parse(buffer.Body.toString('utf-8'));
            } catch(e) {
                throw new Error(e);
            }
        });
    }

    getFs() {
        return new S3FS(env.AWS_S3_BUCKET, awsOptions);
    }

	insertBanner(banner) {

        return this.getBanners().then(banners => {

            banner.id = Date.now();
            banners[banner.id] = banner;

            return this.updateBanners(banners);
        });
    }

    updateBanners(banners) {

        const fsImpl = this.getFs();

        return fsImpl.writeFile('banners.json', JSON.stringify(banners)).then(() => {
            console.log('banners saved !');
        }, function(reason) {
            throw reason;
        });
    }

    deleteBanner(id) {

        return this.getBanners().then(banners => {

            if (banners.hasOwnProperty(id)){

                const bannerId = id.toString();
                delete banners[bannerId];

                return this.updateBanners(banners);

            } else {
                throw new Error(`Banner (${banner.id}) not found`);
            }
        });
    }

    getRandomBanner(params) {

        return this.getBanners().then(banners => {

            const now = moment();

            const availableBanners = this.getValues(banners)
                .filter(this.containsCompany(params.company))
            ;

            let allowedBanners = availableBanners
                .filter(banner => !banner.isDefault)
                .filter(banner =>
                    moment(banner.begin).isBefore(now)
                    && moment(banner.end).isAfter(now)
                )
            ;

            if(allowedBanners.length === 0) {
                allowedBanners = availableBanners
                    .filter(banner => banner.isDefault)
            }

            const randomBanner = allowedBanners[this.rand(0, allowedBanners.length -1)];

            return this.getPictureUrlFromS3Path(randomBanner.path);
        });
    }

    containsCompany(companyName) {

        return (banner) => {

            if (companyName) {
                return banner.companies[companyName];
            }

            return true;
        }
    }

    uploadBanner(bannerFolder, fieldname, file, filename) {

        const fsImpl = this.getFs();

        return new Promise((resolve, reject) => {

            console.log("Uploading: " + filename);

            const [_, name, extension] = /(.*)\.(.*)/.exec(filename);
            const newFilename = `${Date.now()}.${extension}`;
            const fstream = fsImpl.createWriteStream(bannerFolder + newFilename);

            file.pipe(fstream);

            resolve(newFilename);
        });
    }

    getPictureUrlFromS3Path(s3Path) {
        return `http://s3-eu-central-1.amazonaws.com/${env.AWS_S3_BUCKET}${s3Path}`;
    }

	getValues(obj) {
		return Object.keys(obj).map(key => obj[key]);
	}

    rand(min,max) {
       return Math.floor(Math.random()*(max-min+1)+min);
    }
}

module.exports = new BannerController();
