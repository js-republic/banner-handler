import { InjectionToken } from '@angular/core';
import { AppStateType } from './app.state';
import { reducer } from './reducer';
import { Injectable } from '@angular/core';

import { Store, createStore } from "redux";

export const store: Store<AppStateType> = createStore<AppStateType>(reducer,
   (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);

// export const AppStore = new InjectionToken('App.store');

// export const appStoreProviders = [
//    { provide: AppStore, useFactory: store }
// ];

// @Injectable()
// export class Store {

//     private state;

//     constructor() {
//         this.state = AppState;

//         // if(localStorage.getItem('appState') !== null) {
//         //     this.state = JSON.parse(localStorage.getItem('appState'));
//         // }
//     }

//     getState(): AppStateType {
//         return this.state;
//     }

//     dispatch(action, payload: any = false): AppStateType {
//         this.state = reducer(this.state, {type: action, payload});
//         localStorage.setItem('appState', JSON.stringify(this.state));
//         return this.state;
//     }
// }
