import { Banner } from '../banner/banner.model';

export const reducer = (state, action) => {

    switch (action.type) {

        case "ADD_BANNER":

            return {
                banners: state.banners.concat(new Banner(
                    action.payload.path,
                    action.payload.begin,
                    action.payload.end,
                    action.payload.id,
                    action.payload.companies,
                    action.payload.isDefault
                ))
            };

        case 'REMOVE_BANNER':

            return {
                banners: [
                    ...state.banners.slice(0, action.payload.index),
                    ...state.banners.slice(action.payload.index + 1, state.banners.length)
                ]
            }

        case 'GET_BANNERS':
            return state.banners;

        default:
            return state;
    }
};
