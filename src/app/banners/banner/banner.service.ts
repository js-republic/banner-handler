import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Banner } from './banner.model';
import { LoadingService } from '../../loader/loading.service';
import 'rxjs/add/operator/delay';

@Injectable()
export class BannerService {

  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
    this.loadBanners();
  }

  handleLoading(observable: Observable<any>) {
    this.loadingService.isLoading = true;
    return observable.do(
      () => this.loadingService.isLoading = false,
      () => this.loadingService.isLoading = false,
      () => this.loadingService.isLoading = false
    );
  }

  deleteBanner(banner: Banner) {
    return this.handleLoading(this.http.delete(`/banner/${banner.id}`));
  }

  loadBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>('/banner');
  }

  saveBanner(banner): Observable<Banner> {
    return this.handleLoading(
      this.http
        .post<Banner>('/banner', banner)
        .delay(1500)
    );
  }

  getImgUrlFromPath(imgPath) {
    return this.http.get('/banner/img/path?s3Path=' + imgPath);
  }

  uploadBanner(data): Observable<any> {
    return this.handleLoading(this.http.post('/upload', data));
  }
}
