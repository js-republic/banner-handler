import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, LOCALE_ID } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";

import { BannerService } from "./banner/banner.service";
import { BannerDataSource } from "./banner/banner.datasource";
import { AliciaKeys } from "./banner/aliciakeys.pipe";
import { BannerComponent } from "./banner/banner.component";

import { FileUploadModule } from "ng2-file-upload";

import { RouterModule, Routes } from "@angular/router";

import {
  MdButtonModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdToolbarModule,
  MdCardModule,
  MdFormFieldModule,
  MdInputModule,
  MdIconModule,
  MdTableModule,
  MdSortModule,
  MdCheckboxModule,
  MdProgressBarModule,
  MdSidenavModule
} from "@angular/material";
import { FormComponent } from './banner/form/form.component';


const appRoutes: Routes = [
  { path: "login", component: BannerComponent },
  { path: "main", component: LoginComponent },
  { path: "", redirectTo: "/main", pathMatch: "full" }
];

@NgModule({
  declarations: [AppComponent, BannerComponent, LoginComponent, AliciaKeys, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdToolbarModule,
    MdCardModule,
    MdFormFieldModule,
    MdInputModule,
    MdIconModule,
    MdTableModule,
    MdSortModule,
    MdCheckboxModule,
    MdProgressBarModule,
    FileUploadModule,
    MdSidenavModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    BannerService,
    BannerDataSource,
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
