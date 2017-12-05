const fs        = require('fs');
const moment    = require('moment');
const mkdirp    = require('mkdirp');
const banners   = require("../banners.json");

class BannerController {

	getBannersArray() {
		return this.getValues(banners);
	}

	insertBanner(banner) {

		return new Promise((resolve, reject) => {

		    banner.id = Date.now();

		    banners[banner.id] = banner;

		    this.rewriteBanners(banners).then(() => {
                resolve({banner});
            })
		});
    }

    rewriteBanners(banners) {

        return new Promise((resolve, reject) => {

            fs.writeFile(__dirname+'/../banners.json', JSON.stringify(banners, null, 2), 'utf8', (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    
    deleteBanner(id) {

        if (banners.hasOwnProperty(id)){

            const bannerId = id.toString();
            delete banners[bannerId];

            this.rewriteBanners(banners);

        } else {
            throw new Error(`Banner (${banner.id}) not found`);
        }
    }

    getRandomBanner(params) {

        return new Promise((resolve, reject) => {

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

            mkdirp(bannerFolder, function (err) {

                if(err) console.error(err);

                console.log("Uploading: " + filename);

                const [_, name, extension] = /(.*)\.(.*)/.exec(filename);
                const newFilename = `${Date.now()}.${extension}`;
                const fstream = fs.createWriteStream(bannerFolder + newFilename);

                file.pipe(fstream);

                fstream.on("close", () => {
                    console.log("Upload succeed !");
                    resolve(newFilename);
                });
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