import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSidenavModule
} from '@angular/material';

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MomentModule} from 'angular2-moment';
import {FileUploadModule} from 'ng2-file-upload';

import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {UserInfosComponent} from './user-infos/user-infos.component';
import {FormComponent} from './banner/form/form.component';
import {BannerComponent} from './banner/banner.component';

import {BannerService} from './banner/banner.service';
import {AuthService} from './auth/auth.service';

import {BannerDataSource} from './banner/banner.datasource';

/* The best */
import {AliciaKeys} from './banner/aliciakeys.pipe';

import {AuthGard} from './auth/auth.guard';

import { createLogger } from 'redux-logger';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppState, AppStateType } from './redux/app.state';
import { reducer } from './redux/reducer';

import { Store, createStore } from "redux";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGard]},
  {path: 'main', component: BannerComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  declarations: [AppComponent, BannerComponent, UserInfosComponent, LoginComponent, AliciaKeys, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressBarModule,
    FileUploadModule,
    MatSidenavModule,
    NgReduxModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // <-- debugging purposes only
    ),
    MomentModule
  ],
  providers: [
    BannerService,
    BannerDataSource,
    AuthGard,
    AuthService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    // appStoreProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<AppStateType>) {
    ngRedux.configureStore(reducer, AppState, [ createLogger() ]);
  }
}
