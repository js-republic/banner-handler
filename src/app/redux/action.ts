import { Injectable } from '@angular/core';
import { BannerService } from '../banner/banner.service';

import { NgRedux } from '@angular-redux/store';

import { AppStateType } from './app.state';

@Injectable()
export class Action {

    constructor(
        private bannerService: BannerService,
        private ngRedux: NgRedux<AppStateType>
    ) {}

    getBanners() {

        const action = 'GET_BANNERS';
        this.ngRedux.dispatch({type: action});

        this.bannerService.loadBanners().subscribe(banners => {

            this.ngRedux.dispatch({
                type: `${action}_SUCCESS`,
                payload: banners
            });

        }, (error) => {

            this.ngRedux.dispatch({
                type: `${action}_ERROR`,
                payload: error
            });
        });
    }

    addBanner(banner) {

        this.ngRedux.dispatch({
            type: 'ADD_BANNER'
        });

        this.bannerService.saveBanner(banner).subscribe(() => {
            this.getBanners();
        });
    }

    removeBanner(banner) {

        this.ngRedux.dispatch({
            type: 'REMOVE_BANNER'
        });

        this.bannerService.deleteBanner(banner).subscribe(() => {
            this.getBanners();
        });
    }

    sortBanners(sortStatus, propertyName) {

        this.ngRedux.dispatch({
            type: 'SORT_BANNERS',
            payload: {
                sortStatus,
                propertyName
            }
        });
    }
}

export class ActionSuccess {

}

export class ActionFail {

}
