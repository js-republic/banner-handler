import { Banner } from '../banner/banner.model';

export interface Loading {
    banners: boolean
}

export interface AppStateType {
    banners: Banner[],
    loading: Loading
}

export const AppState: AppStateType = {
    banners: [],
    loading: {
        banners: false
    }
}
