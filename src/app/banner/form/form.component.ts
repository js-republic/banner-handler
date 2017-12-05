import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter, Input
} from '@angular/core';

import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

import {Banner} from '../banner.model';
import {BannerService} from '../banner.service';

@Component({
  selector: 'app-banner-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() added = new EventEmitter();

  @Input() set newBanner(val: Banner) {
    this.banner = val;
    console.log('newBanner', this.banner);
    this.uploader.clearQueue();
  }

  public banner: Banner;
  public picToUpload = null;
  public uploader: FileUploader;

  constructor(private bannerService: BannerService, private el: ElementRef) {
    this.uploader = new FileUploader({
      url: '/banner/upload',
      itemAlias: 'picture'
    });
  }

  ngOnInit() {
    this.handleUploaderOverrides();
  }

  handleUploaderOverrides() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.showPreviewPicture(file);
      // this.uploader.uploadAll();
    };

    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item, response, status, headers) => {

      console.log('response', response);
      const img = JSON.parse(response).data;
      this.banner.path = '/assets/banners/' + img;

      this.bannerService.saveBanner(this.banner).subscribe(() => {
        this.added.emit();
      });
    };
  }

  showPreviewPicture(picture) {

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.banner.path = e.target.result;
    };

    const element: any = document.querySelector(".upload-picture");

    picture = element.files[0];

    // read the image file as a data URL.
    reader.readAsDataURL(picture);
  }

  saveBanner() {

    if (this.banner.isDefault) {
      this.banner.begin = null;
      this.banner.end = null;
    }

    this.uploader.uploadAll();
  }

  onCompaniesCkChange(companyName) {
    this.banner.companies[companyName] = !this.banner.companies[companyName];
  }

  getCompanyValue(companyName) {
    return this.banner.companies[companyName];
  }

  get imageStatus(): string {
    if (this.uploader.progress !== 100) {
      return this.uploader.isUploading ? 'uploadingImgState' : 'choosingImgState';
    } else {
      return 'imgChoosedState';
    }
  }
}
