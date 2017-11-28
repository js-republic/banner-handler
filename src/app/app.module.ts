import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';

import {BannerService} from './banner/banner.service';
import {BannerDataSource} from './banner/banner.datasource';
import {AliciaKeys} from './banner/aliciakeys.pipe';
import {BannerComponent} from './banner/banner.component';

import {FileUploadModule} from 'ng2-file-upload';

import {RouterModule, Routes} from '@angular/router';

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
import {FormComponent} from './banner/form/form.component';
import {AuthGard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: BannerComponent, canActivate: [AuthGard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  declarations: [AppComponent, BannerComponent, LoginComponent, AliciaKeys, FormComponent],
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
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [
    BannerService,
    BannerDataSource,
    AuthGard,
    AuthService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
