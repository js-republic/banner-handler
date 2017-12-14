import { AppState, AppStateType } from './app.state';
import { Banner } from '../banner/banner.model';
import { Reducer, Action } from 'redux';
import * as moment from 'moment';

interface PayloadAction extends Action {
   type: string;
   payload: any;
}

export const reducer: Reducer<AppStateType> = (state: AppStateType = AppState, action: PayloadAction): AppStateType => {

    switch (action.type) {

        case "ADD_BANNER":

            // return {
            //     banners: state.banners.concat(new Banner(
            //         action.payload.path,
            //         action.payload.begin,
            //         action.payload.end,
            //         action.payload.id,
            //         action.payload.companies,
            //         action.payload.isDefault
            //     )),
            //     loading: state.loading
            // };

            return state;

        case 'REMOVE_BANNER':

            // return {
            //     banners: [
            //         ...state.banners.slice(0, action.payload.index),
            //         ...state.banners.slice(action.payload.index + 1, state.banners.length)
            //     ],
            //     loading: state.loading
            // };

            return state;

        case 'GET_BANNERS':

            return {
                ...state,
                banners: state.banners,
                loading: {
                    banners: true
                }
            };

        case 'GET_BANNERS_SUCCESS':

            return {
                ...state,
                banners: action.payload,
                loading: {
                    banners: false
                }
            };

        case 'SORT_BANNERS':

            const propertyName = action.payload.propertyName;
            const sortStatus = action.payload.sortStatus;

            const sortedBanners = state.banners.sort((a, b) => {

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

                if (sortStatus[propertyName] === 'desc') {
                    result *= -1;
                }

                return result;
            });

            return {
                ...state,
                banners: sortedBanners
            };

        default:
            return state;
    }
};
