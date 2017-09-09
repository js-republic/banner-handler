import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { BannerService } from "./banner/banner.service";
import { BannerDataSource } from "./banner/banner.datasource";
import { AliciaKeys } from "./banner/aliciakeys.pipe";
import { BannerComponent } from "./banner/banner.component";

import { FileUploadModule } from "ng2-file-upload";

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
  MdCheckboxModule
} from "@angular/material";

const declarations = [AppComponent, BannerComponent, AliciaKeys];

const imports = [
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
  FileUploadModule
];

const providers = [BannerService, BannerDataSource];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [AppComponent]
})
export class AppModule {}
