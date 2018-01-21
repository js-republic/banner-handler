import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import {Banner} from './banner.model';

@Injectable()
export class BannerService {

  constructor(private http: HttpClient) {
    this.loadBanners();
  }

  deleteBanner(banner: Banner) {
    return this.http.delete(`/banner/${banner.id}`);
  }

  loadBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>('/banner');
  }

  saveBanner(banner): Observable<Banner> {

    return this.http
      .post<Banner>('/banner', banner);
  }

  getImgUrlFromPath(imgPath) {
    return this.http.get('/banner/img/path?s3Path=' + imgPath);
  }

  uploadBanner(data): Observable<any> {
    return this.http.post('/upload', data)
  }
}
