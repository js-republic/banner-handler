import {TestBed} from '@angular/core/testing';
import {BannerService} from './banner.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {instance, mock} from 'ts-mockito';
import {LoadingService} from '../../loader/loading.service';
import {Banner} from './banner.model';

describe('BannerService', () => {

  let loadServiceMock: LoadingService;

  function configureTestingModule() {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BannerService,
        {provide: LoadingService, useValue: instance(loadServiceMock)}
      ],
    });
  }

  beforeEach(() => {
    loadServiceMock = mock(LoadingService);
  });

  it('should send delete request when deleteBanner is called', () => {
    // given
    configureTestingModule();
    const service: BannerService = TestBed.get(BannerService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const banner = new Banner('', new Date(), new Date(), '1234');

    // when
    service.deleteBanner(banner).subscribe();

    // then
    httpMock.expectOne('/banner/1234').flush(null);
    httpMock.verify();
  });

  it('should be in loading mode during deleting', () => {
    // given
    configureTestingModule();
    const banner = new Banner('', new Date(), new Date(), '1234');
    const loadingService: LoadingService = TestBed.get(LoadingService);
    const service: BannerService = TestBed.get(BannerService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

    // when
    service.deleteBanner(banner).subscribe();

    // then
    expect(loadingService.isLoading).toBe(true);
    httpMock.expectOne('/banner/1234').flush(null);
    expect(loadingService.isLoading).toBe(false);
  });

  it('should send get request when loadBanners is called', (done) => {
    // given
    configureTestingModule();
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const service: BannerService = TestBed.get(BannerService);
    const expectedBanners = [
      new Banner('/avatar.jpg', new Date(), new Date(), '1'),
      new Banner('/avatar2.jpg', new Date(), new Date(), '2'),
    ];

    // when
    const banners$ = service.loadBanners();

    // then
    banners$.subscribe((banners) => {
      expect(banners).toEqual(expectedBanners);
      done();
    });
    httpMock.expectOne('/banner').flush(expectedBanners);
    httpMock.verify();
  });

  it('should send post request when saveBanner is called', () => {
    // given
    configureTestingModule();
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const service: BannerService = TestBed.get(BannerService);
    const bannerToSave = new Banner('', new Date(), new Date(), '1234');

    // when
    service.saveBanner(bannerToSave).subscribe();

    // then
    const req = httpMock.expectOne('/banner');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(bannerToSave);
    req.flush(null, {status: 201, statusText: 'Created'});
    httpMock.verify();
  });

  it('should send get request when getImgUrlFromPath is called', (done) => {
    // given
    configureTestingModule();
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const service: BannerService = TestBed.get(BannerService);
    const expectedUrl = '/toto/my-image.png';
    const response = {data: expectedUrl};

    // when
    const url$ = service.getImgUrlFromPath('anyThing.png');

    // then
    url$.subscribe((url) => {
      expect(url).toEqual(expectedUrl);
      done();
    });
    httpMock.expectOne(`/banner/img/path?s3Path=anyThing.png`).flush(response);
    httpMock.verify();
  });

  it('should send upload image when uploadBanner is called', () => {
    // given
    configureTestingModule();
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const service: BannerService = TestBed.get(BannerService);
    const imgContent = '1234567';

    // when
    service.uploadBanner(imgContent).subscribe();

    // then
    const req = httpMock.expectOne(`/upload`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(imgContent);
    req.flush(null, {status: 200, statusText: 'done'});
    httpMock.verify();
  });
});
