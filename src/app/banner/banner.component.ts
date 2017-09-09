import { Injectable, Component, OnInit, ElementRef } from "@angular/core";
import { Http, Response } from "@angular/http";
import {DataSource} from '@angular/cdk/collections';

import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Observable } from 'rxjs/Rx';
import * as moment from "moment";

import { Banner } from "./banner.model";
import { BannerService } from "./banner.service";
// import { BannerDataSource } from "./banner.datasource";

@Component({
    selector: "banner",
    templateUrl: "./banner.component.html",
    styleUrls: ["./banner.component.scss"]
})

export class BannerComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({
        url: "/banner/upload",
        itemAlias: "picture"
    });

    banner: Banner = new Banner();
    banners: Banner[] = [];
    sortStatus = {
        begin: "asc",
        end: ""
    };

    constructor(
        private http: Http,
        private el: ElementRef,
        private bannerService: BannerService
    ) {}

    ngOnInit() {
        this.loadBanners();
        this.handleUploaderOverrides();
    }

    loadBanners() {

      this.bannerService
          .loadBanners()
          .subscribe(
            response => (this.banners = response),
            error => console.log(error)
          );
    }

    sortBanners(propertyName) {

        Object.entries(this.sortStatus).forEach(([key,value]) => {

            if(propertyName !== key) {
                this.sortStatus[key] = "";
            }
        });

        if(this.sortStatus[propertyName] === "" || this.sortStatus[propertyName] === "desc") {
            this.sortStatus[propertyName] = "asc";
        } else {
            this.sortStatus[propertyName] = "desc";
        }

        this.banners.sort((a, b) => {

            const aDate = moment(a[propertyName]);
            const bDate = moment(b[propertyName]);

            let result;

            if(aDate.isSame(bDate)) {
                result = 0;
            } else if(aDate.isBefore(bDate)) {
                result = 1;
            } else {
                result = -1;
            }

            if(this.sortStatus[propertyName] === "desc") {
                result *= -1;
            }

            return result;

        });
    }

    deleteBanner(b){
        this.bannerService.deleteBanner(b).subscribe(() => this.loadBanners());
    }

    handleUploaderOverrides() {

        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = file => {
            file.withCredentials = false;
            this.uploader.uploadAll();
        };

        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = (
            item,
            response,
            status,
            headers
        ) => {
            const img = JSON.parse(response).data;
            this.banner.path = "assets/banners/" + img;
        };
    }

    upload() {

        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector("#picture");

        const fileCount: number = inputEl.files.length;
        const formData = new FormData();

        if (fileCount > 0) {

            formData.append("picture", inputEl.files.item(0));
            this.bannerService.uploadBanner(formData);
        }
    }

    saveBanner() {
        this.bannerService.saveBanner(this.banner).subscribe(() => {
            this.banner = new Banner();
            this.loadBanners();
        });
    }

    onCompaniesCkChange(companyName) {
        this.banner.companies[companyName] = !this.banner.companies[companyName];
    }

    getCompanyValue(companyName) {
        return this.banner.companies[companyName];
    }
}
