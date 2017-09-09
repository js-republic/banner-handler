import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Banner } from './banner.model';

@Injectable()
export class BannerService {

  constructor(private http: Http) {
    this.loadBanners();
  }

  deleteBanner(banner:Banner) {
    return this.http.delete(`/banner/${banner.id}`);
  }

  loadBanners () {

    return this.http.get('/banner')
      .map((res:Response) => res.json());
  }

  saveBanner(banner): Observable<Banner> {

  	return this.http
      .post("/banner", banner)
      .map((res: Response) => res.json());
  }

  uploadBanner(data) {

  	this.http
        .post("/upload", data)
        .map((res: Response) => res.json())
        .subscribe(
          success => console.log(success._body),
          error => console.error(error)
        );
  }

}
