import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Banner} from './banner.model';
import {BannerService} from './banner.service';

const fakeBanners = [{
  path: '/assets/banners/1512477609895.png',
  begin: '2017-12-05T12:39:58.802Z',
  end: '2018-01-05T12:39:58.803Z',
  id: '1512477610163',
  companies: {
    js: true,
    ux: true,
    iot: true
  },
  isDefault: false
}];

@Injectable()
export class BannerServiceMock extends BannerService {

  deleteBanner(banner: Banner) {
    return of({});
  }

  loadBanners(): Observable<Banner[]> {
    return of(fakeBanners);
  }

  saveBanner(banner): Observable<Banner> {
    return of(fakeBanners[0]);
  }

  getImgUrlFromPath(imgPath) {
    return of(fakeBanners[0].path);
  }
}
