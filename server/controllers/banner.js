const moment = require('moment');
const S3FS = require('s3fs');
const env = require('../env');

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
      } catch (e) {
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

  deleteBanner(id) {
    const bannerId = id.toString();
    return this.getBanners()
      .then(banners => {
        if (banners.hasOwnProperty(bannerId)) {
          return banners;
        } else {
          throw new Error(`Banner (${bannerId}) not found`);
        }
      })
      .then(banners => {
        return Promise.all([banners, this.deleteImageQuietly(banners[bannerId].path)]);
      })
      .then(([banners]) => {
        delete banners[bannerId];
        return this.updateBanners(banners);
      });
  }

  deleteImageQuietly(path) {
    return this.getFs().unlink(path).catch((e) => console.log('Doesn\'t matter', e));
  }

  updateBanners(banners) {
    return this.getFs()
      .writeFile('banners.json', JSON.stringify(banners))
      .then(() => {
        return banners;
      }, (reason) => {
        throw reason;
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

      if (allowedBanners.length === 0) {
        allowedBanners = availableBanners
          .filter(banner => banner.isDefault)
      }

      const randomBanner = allowedBanners[this.rand(0, allowedBanners.length - 1)];

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

    return new Promise((resolve) => {
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

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = new BannerController();
