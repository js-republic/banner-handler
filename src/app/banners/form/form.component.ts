import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter, Input
} from '@angular/core';

import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

import {Banner} from '../banner/banner.model';
import {BannerService} from '../banner/banner.service';

@Component({
  selector: 'app-banner-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() added = new EventEmitter();

  @Input() set newBanner(val: Banner) {
    this.banner = val;
    this.uploader.clearQueue();
  }

  public banner: Banner;
  public pictureLoaded: boolean = false;
  public uploader: FileUploader;

  constructor(private bannerService: BannerService, private el: ElementRef) {
    this.initUploader();
  }

  ngOnInit() {
    this.handleUploaderOverrides();
  }

  initUploader() {

    this.uploader = new FileUploader({
      url: '/banner/upload',
      itemAlias: 'picture'
    });
  }

  handleUploaderOverrides() {

    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.showPreviewPicture();
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      const img = JSON.parse(response).data;
      this.banner.path = '/assets/banners/' + img;
      this.registerBanner();
    };
  }

  showPreviewPicture() {

    const reader = new FileReader();
    const element: any = document.querySelector(".upload-picture");
    const picture = element.files[0];

    reader.onload = (e: any) => {
      this.setBannerPath(e.target.result);
    };

    reader.readAsDataURL(picture);

    this.pictureLoaded = true;
  }

  setBannerPath(path) {
    this.banner.path = path;
  }

  handleBannerPeriod() {

    if (this.banner.isDefault) {
      this.banner.begin = null;
      this.banner.end = null;
    }
  }

  saveBanner() {

    this.handleBannerPeriod();

    // This event calls this.uploader.onCompleteItem when upload finished
    // Then this.uploader.onCompleteItem calls registerBanner()
    this.uploader.uploadAll();
  }

  registerBanner() {

    this.bannerService.saveBanner(this.banner).subscribe(() => {
      this.added.emit();
    });
  }

  onCompaniesCkChange(companyName: string) {
    this.banner.companies[companyName] = !this.banner.companies[companyName];
  }

  getCompanyValue(companyName: string) {
    return this.banner.companies[companyName];
  }

  getBannerPath(): string {

    if(this.banner && this.banner.path) {
      return 'url(' + this.banner.path + ')';
    }

    return '';
  }

  get imageStatus(): string {
    if (this.uploader.progress !== 100) {
      return this.uploader.isUploading ? 'uploadingImgState' : 'choosingImgState';
    } else {
      return 'imgChoosedState';
    }
  }

  canShowSaveButton() {
    return !this.pictureLoaded;
  }

  inputCanBeShown() {
    const testEnv = localStorage.getItem('testEnv');
    return testEnv && testEnv === 'true';
  }
}
