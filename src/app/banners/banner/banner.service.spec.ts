import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {LoadingService} from '../../loader/loading.service';
import {BannerService} from './banner.service';

describe('BannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BannerService, HttpClient, HttpHandler, LoadingService]
    });
  });

  it('should be created', inject([BannerService], (service: BannerService) => {
    expect(service).toBeTruthy();
  }));
});
