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
import {FormComponent} from './banners/form/form.component';
import {BannersComponent} from './banners/banners.component';

import {BannerService} from './banners/banner/banner.service';
import {AuthService} from './auth/auth.service';

/* The best */
import {AliciaKeys} from './banners/aliciakeys.pipe';

import {AuthGard} from './auth/auth.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: BannersComponent, canActivate: [AuthGard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  declarations: [AppComponent, BannersComponent, UserInfosComponent, LoginComponent, AliciaKeys, FormComponent],
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
    RouterModule.forRoot(
      appRoutes,
    ),
    MomentModule
  ],
  providers: [
    BannerService,
    AuthGard,
    AuthService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
