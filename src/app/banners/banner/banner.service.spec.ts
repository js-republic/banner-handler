import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BannerServiceMock } from './banner.service.mock';
import { LoadingService } from '../../loader/loading.service';

describe('BannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BannerServiceMock, HttpClient, HttpHandler, LoadingService]
    });
  });

  it('should be created', inject([BannerServiceMock], (service: BannerServiceMock) => {
    expect(service).toBeTruthy();
  }));
});
