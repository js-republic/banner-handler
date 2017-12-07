import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter, Input
} from '@angular/core';

import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import * as moment from 'moment';

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
  public uploader: FileUploader;

  public isDateBeginAfterDateEnd = true;
  public isAtLeastOneCompany = true;
  public isBannerImagePresent = true;

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
      this.uploader.uploadAll();
    };

    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item, response, status, headers) => {

      console.log('response', response);
      const img = JSON.parse(response).data;
      this.banner.path = '/assets/banners/' + img;
    };
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      '#picture'
    );

    const fileCount: number = inputEl.files.length;
    const formData = new FormData();

    if (fileCount > 0) {
      formData.append('picture', inputEl.files.item(0));
      this.bannerService.uploadBanner(formData);
    }
  }

  saveBanner() {

    // Si la bannière n'est pas affiché tout le temps,
    // les deux champs date doivent être remplie au bon format
    const isShowedAllTime = this.banner.isDefault;
    const date_debut = moment(this.banner.begin);
    const date_fin = moment(this.banner.end);
    if (
      !isShowedAllTime &&
      date_debut.isValid() &&
      date_fin.isValid()
    ) {

      // La date de début doit être inférieur à la date de fin
      // Si date_debut est après date_fin, print un message d'erreur
      if ( date_debut.isAfter(date_fin) ) {
        this.isDateBeginAfterDateEnd = false;
      } else {
        this.isDateBeginAfterDateEnd = true;
      }

    }

    // Au moins une entreprise doit être sélectionnée
    const isPresentCompaniesList = this.banner.companies;
    let sum = 0;
    Object.values(isPresentCompaniesList).map(isPresent => {
      if ( isPresent === false ) sum++;
    });
    // Si sum vaut 3, print un message d'erreur
    if ( sum === 3 ) {
      this.isAtLeastOneCompany = false;
    } else {
      this.isAtLeastOneCompany = true;
    }

    // Une image doit être choisie
    const imagePath = this.banner.path;
    // Si imagePath est vide, print un message d'erreur
    if ( imagePath === '' ) {
      this.isBannerImagePresent = false;
    } else {
      this.isBannerImagePresent = true;
    }

    if (this.banner.isDefault) {
      this.banner.begin = null;
      this.banner.end = null;
    }

    if (
      this.isDateBeginAfterDateEnd &&
      this.isAtLeastOneCompany &&
      this.isBannerImagePresent
    ) {
      this.bannerService.saveBanner(this.banner).subscribe(() => {
        this.added.emit();
      });
    }

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
