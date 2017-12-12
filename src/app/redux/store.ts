import { AppState, AppStateType } from './app.state';
import { reducer } from './reducer';

export class Store {

    private state;

    constructor() {
        this.state = AppState;
    }

    getState(): AppStateType {
        return this.state;
    }

    dispatch(action): AppStateType {
        this.state = reducer(this.state, {type: action});
        return this.state;
    }
}
