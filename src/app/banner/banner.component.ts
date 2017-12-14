/**
 * Librairies
 */
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { Observable } from "rxjs";

import * as moment from 'moment';

/**
 * Redux related
 */
import { Store } from 'redux';
import { NgRedux, select } from '@angular-redux/store';

import { Action } from '../redux/action';
import { store } from '../redux/store';

import { AppStateType, Loading } from '../redux/app.state';

/**
 * Component related
 */
import { Banner } from './banner.model';
import { BannerService } from './banner.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    providers: [Action]
})
export class BannerComponent implements OnInit {

    @ViewChild('sidenav') private sidenav: MatSidenav;
    @select() banners: Observable<Banner[]>;
    @select() loading: Observable<Loading>;

    public sortStatus = { begin: 'asc', end: '' };
    public newBanner: Banner = new Banner();

    constructor(
        private bannerService: BannerService,
        private action: Action,
        private ngRedux: NgRedux<AppStateType>
    ) {}

    ngOnInit() {
        this.loadBanners();
    }

    loadBanners() {
        this.action.getBanners();
    }

    onBannerAdded() {
        this.sidenav.close();
    }

    createNewBanner() {
        this.sidenav.open();
        this.newBanner = new Banner();
    }

    reinitSortStatusKeys(propertyName) {

        Object.entries(this.sortStatus).forEach(([key, value]) => {
            if (propertyName !== key) {
                this.sortStatus[key] = '';
            }
        });
    }

    getSortStatusByProperty(propertyName) {

        const prop = this.sortStatus[propertyName];

        if (prop === '' || prop === 'desc') {
            return'asc';
        }

        return 'desc';
    }

    updateSortStatus(propertyName) {

        this.reinitSortStatusKeys(propertyName);
        this.sortStatus[propertyName] = this.getSortStatusByProperty(propertyName);
    }

    sortBanners(propertyName) {

        this.updateSortStatus(propertyName);
        this.action.sortBanners(this.sortStatus, propertyName);
    }

    getArrowState(key) {

        let icon = 'arrow_drop_up';

        if (this.sortStatus[key] === 'asc') {
            icon = 'arrow_drop_down';
        }

        return icon;
    }

    getBannerPicture(banner) {

        if (!banner.loading) {
            banner.loading = true;

            this.bannerService.getImgUrlFromPath(banner.path).subscribe((url: any) => {
                banner.picture = url.data;
            });
        }
    }

    bannerHasPicture(banner) {

        if (!banner.picture) {
            this.getBannerPicture(banner);
            return false;
        }

        return true;
    }

    deleteBanner(b) {
        this.action.removeBanner(b);
    }
}
