import {Component, OnInit, ViewChild} from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

import {Banner} from './banner.model';
import {BannerService} from './banner.service';

import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @ViewChild('sidenav') private sidenav: MatSidenav;
  public banners: Banner[] = [];
  public sortStatus = {begin: 'asc', end: ''};
  public newBanner = new Banner();

  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.loadBanners();
  }

  onBannerAdded() {
    this.sidenav.close();
    this.loadBanners();
  }

  loadBanners() {
    this.bannerService
      .loadBanners()
      .subscribe(
        response => (this.banners = response),
        error => console.log(error)
      );
  }

  createNewBanner() {
    this.sidenav.open();
    this.newBanner = new Banner();
  }

  sortBanners(propertyName) {

    Object.entries(this.sortStatus).forEach(([key, value]) => {
      if (propertyName !== key) {
        this.sortStatus[key] = '';
      }
    });

    if (
      this.sortStatus[propertyName] === '' ||
      this.sortStatus[propertyName] === 'desc'
    ) {
      this.sortStatus[propertyName] = 'asc';
    } else {
      this.sortStatus[propertyName] = 'desc';
    }

    this.banners.sort((a, b) => {
      const aDate = moment(a[propertyName]);
      const bDate = moment(b[propertyName]);

      let result;

      if (aDate.isSame(bDate)) {
        result = 0;
      } else if (aDate.isBefore(bDate)) {
        result = 1;
      } else {
        result = -1;
      }

      if (this.sortStatus[propertyName] === 'desc') {
        result *= -1;
      }

      return result;
    });
  }

  getArrowState(key) {

    let icon = 'arrow_drop_up';

    if ( this.sortStatus[key] === 'asc' ) {
      icon = 'arrow_drop_down';
    }

    return icon;
  }

  getBannerPicture(banner) {

    if(!banner.loading) {
      banner.loading = true;

      this.bannerService.getImgUrlFromPath(banner.path).subscribe((url: any) => {
        banner.picture = url.data;
      });
    }
  }

  bannerHasPicture(banner) {

    if(!banner.picture) {
      this.getBannerPicture(banner);
      return false;
    }

    return true;
  }

  deleteBanner(b) {
    this.bannerService.deleteBanner(b).subscribe(() => this.loadBanners());
  }
}

