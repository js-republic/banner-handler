import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

import { FileUploader } from "ng2-file-upload/ng2-file-upload";

import { Banner } from "../banner.model";
import { BannerService } from "../banner.service";

@Component({
  selector: "banner-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Output() added = new EventEmitter();

  public uploader: FileUploader = new FileUploader({
    url: "/banner/upload",
    itemAlias: "picture"
  });

  banner: Banner = new Banner();

  constructor(private bannerService: BannerService, private el: ElementRef) {}

  ngOnInit() {
    this.handleUploaderOverrides();
  }

  handleUploaderOverrides() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item, response, status, headers) => {
      const img = JSON.parse(response).data;
      this.banner.path = "/assets/banners/" + img;
    };
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#picture"
    );

    const fileCount: number = inputEl.files.length;
    const formData = new FormData();

    if (fileCount > 0) {
      formData.append("picture", inputEl.files.item(0));
      this.bannerService.uploadBanner(formData);
    }
  }

  saveBanner() {
    if (this.banner.isDefault) {
      this.banner.begin = null;
      this.banner.end = null;
    }
    this.bannerService.saveBanner(this.banner).subscribe(() => {
      this.banner = new Banner();
      this.added.emit();
      this.uploader.clearQueue();
    });
  }

  onCompaniesCkChange(companyName) {
    this.banner.companies[companyName] = !this.banner.companies[companyName];
  }

  getCompanyValue(companyName) {
    return this.banner.companies[companyName];
  }
}
