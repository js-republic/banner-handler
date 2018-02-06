import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Banner} from './banner.model';
import {LoadingService} from '../../loader/loading.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class BannerService {

  private static WAIT_FOR_AMAZON_IS_READY: number = 1500;

  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
    this.loadBanners();
  }

  private goToLoadingWhile(observable: Observable<any>): Observable<any> {
    this.loadingService.isLoading = true;
    return observable.do(
      () => this.loadingService.isLoading = false,
      () => this.loadingService.isLoading = false,
      () => this.loadingService.isLoading = false
    );
  }

  public deleteBanner(banner: Banner): Observable<any> {
    return this.goToLoadingWhile(this.http.delete(`/banner/${banner.id}`));
  }

  public loadBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>('/banner');
  }

  public saveBanner(banner): Observable<Banner> {
    return this.goToLoadingWhile(
      this.http
        .post<Banner>('/banner', banner)
        .delay(BannerService.WAIT_FOR_AMAZON_IS_READY)
    );
  }

  public getImgUrlFromPath(imgPath): Observable<string> {
    const path = `/banner/img/path?s3Path=${imgPath}`;
    return this.http.get<{ data: string }>(path)
      .map((resp) => resp.data);
  }

  public uploadBanner(data): Observable<any> {
    return this.goToLoadingWhile(this.http.post('/upload', data));
  }
}
