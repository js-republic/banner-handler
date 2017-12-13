import {Injectable} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Banner} from './banner.model';
import {BannerService} from './banner.service';

@Injectable()
export class BannerDataSource extends DataSource<any> {

  private bannersSource: Subject<any> = new Subject();
  private rawBanners: Banner[];

  constructor(private bannerService: BannerService) {
    super();
  }

  connect(): Observable<Banner[]> {
    this.bannerService.loadBanners().subscribe(banners => {
      this.rawBanners = banners;
      this.bannersSource.next(banners);
    });
    return this.bannersSource.asObservable();
  }

  sort(event) {

    console.log('bannersSource', this.bannersSource);

    this.bannersSource.next(this.rawBanners.sort((a, b) => {
      if (event.position === 'asc' && event.active) {
        return b[event.active] - a[event.active];
      }
    }));
  }

  disconnect() {
  }
}
