import { Banner } from '../banner/banner.model';

export interface AppStateType {
    banners: Banner[]
}

export const AppState: AppStateType = {
    banners: []
}
