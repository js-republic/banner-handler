import { Injectable, Component, OnInit, ViewChild } from "@angular/core";
import { Http, Response } from "@angular/http";
import { DataSource } from "@angular/cdk/collections";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Rx";
import * as moment from "moment";

import { Banner } from "./banner.model";
import { BannerService } from "./banner.service";

import { MdSidenav } from "@angular/material";

@Component({
  selector: "banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"]
})
export class BannerComponent implements OnInit {
  @ViewChild("sidenav") private sidenav: MdSidenav;
  public banners: Banner[] = [];
  public sortStatus = {
    begin: "asc",
    end: ""
  };

  constructor(private http: Http, private bannerService: BannerService) {}

  ngOnInit() {
    this.loadBanners();
  }

  onBannerAdded() {
    this.sidenav.close();
    this.loadBanners();
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
    Object.entries(this.sortStatus).forEach(([key, value]) => {
      if (propertyName !== key) {
        this.sortStatus[key] = "";
      }
    });

    if (
      this.sortStatus[propertyName] === "" ||
      this.sortStatus[propertyName] === "desc"
    ) {
      this.sortStatus[propertyName] = "asc";
    } else {
      this.sortStatus[propertyName] = "desc";
    }

    this.banners.sort((a, b) => {
      const aDate = moment(a[propertyName]);
      const bDate = moment(b[propertyName]);

      let result;

      if (aDate.isSame(bDate)) {
        result = 0;
      } else if (aDate.isBefore(bDate)) {
        result = 1;
      } else {
        result = -1;
      }

      if (this.sortStatus[propertyName] === "desc") {
        result *= -1;
      }

      return result;
    });
  }

  deleteBanner(b) {
    this.bannerService.deleteBanner(b).subscribe(() => this.loadBanners());
  }
}
