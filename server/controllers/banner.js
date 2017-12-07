const fs        = require('fs');
const moment    = require('moment');
const S3FS      = require('s3fs');

const awsOptions = {
  endpoint: 's3-eu-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'eu-central-1',
  accessKeyId: "AKIAJ6P66UVG5NKDRCNQ",
  secretAccessKey: "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",
};

class BannerController {

	getBannersArray() {

        return this.getBanners().then(banners => {
            return Promise.resolve(this.getValues(banners));
        });
	}

    getBanners() {

        return this.getFs().readFile('/banners.json').then(buffer => {

            try {
                return JSON.parse(buffer.Body.toString('utf-8'));
            } catch(e) {
                throw e;
            }
        });
    }

    getFs() {
        return new S3FS('banner-handler', awsOptions);
    }

	insertBanner(banner) {

		return new Promise((resolve, reject) => {

            this.getBanners().then(banners => {

                console.log('banners', banners);

                banner.id = Date.now();
                banners[banner.id] = banner;

                this.updateBanners(banners);
            });
		});
    }

    updateBanners(banners) {

        const fsImpl = this.getFs();

        fsImpl.writeFile('banners.json', JSON.stringify(banners)).then(() => {
            console.log('saved !');
        }, function(reason) {
            throw reason;
        });
    }

    deleteBanner(id) {

        this.getBanners().then(banners => {

            if (banners.hasOwnProperty(id)){

                const bannerId = id.toString();
                delete banners[bannerId];

                this.updateBanners(banners);

            } else {
                throw new Error(`Banner (${banner.id}) not found`);
            }
        });
    }

    getRandomBanner(params) {

        return new Promise((resolve, reject) => {

            this.getBanners().then(banners => {

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

                resolve(randomBanner.path);
            });
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

        return new Promise((resolve, reject) => {

            console.log("Uploading: " + filename);

            const [_, name, extension] = /(.*)\.(.*)/.exec(filename)
            const newFilename = `${Date.now()}.${extension}`;
            const fstream = fs.createWriteStream(bannerFolder + newFilename);

            file.pipe(fstream);
            fstream.on("close", () => {
                console.log("Upload succeed !");
                resolve(newFilename);
            });
        });
    }

	getValues(obj) {
		return Object.keys(obj).map(key => obj[key]);
	}

    rand(min,max) {
       return Math.floor(Math.random()*(max-min+1)+min);
    }
}

module.exports = new BannerController();
