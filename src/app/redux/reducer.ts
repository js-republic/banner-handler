import { Banner } from '../banner/banner.model';

export const reducer = (state, action) => {

    switch (action.type) {

        case "ADD_BANNER":

            console.log('add banner');

            return {
                banners: state.banners.concat(new Banner(
                    "/assets/banners/1513011575778.jpg",
                    "2017-12-11T14:29:21.034Z",
                    "2018-01-11T14:29:21.034Z",
                    '1513011575983',
                    {"js":false,"ux":true,"iot":false},
                    false
                ))
            };

        case 'GET_BANNERS':
            return state.banners;

        default:
            return state;
    }
};
