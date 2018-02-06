import {ComponentFixture, TestBed} from '@angular/core/testing';
import {anyString, instance, mock, when} from 'ts-mockito';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {MatButtonModule, MatSortModule} from '@angular/material';

import {MomentModule} from 'angular2-moment';

import {BannersComponent} from './banners.component';

import {BannerService} from './banner/banner.service';

import {AliciaKeys} from '../commons/aliciakeys.pipe';
import {LoadingService} from '../loader/loading.service';
import {of} from 'rxjs/observable/of';
import {Banner} from './banner/banner.model';

describe('BannerComponent', () => {

  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;
  let mockedBannerService: BannerService;
  let mockedLoadingService: LoadingService;

  async function configureTestingModule(): Promise<any> {
    return TestBed.configureTestingModule({
      providers: [
        {provide: LoadingService, useValue: instance(mockedLoadingService)},
        {provide: BannerService, useValue: instance(mockedBannerService)},
      ],
      imports: [
        MatButtonModule,
        MatSortModule,
        MomentModule,
      ],
      declarations: [
        BannersComponent,
        AliciaKeys
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BannersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }

  beforeEach(() => {
    mockedBannerService = mock(BannerService);
    mockedLoadingService = mock(LoadingService);
  });

  it('should be created', async () => {
    // given
    when(mockedBannerService.loadBanners()).thenReturn(of([new Banner()]));
    when(mockedBannerService.getImgUrlFromPath(anyString())).thenReturn(of(''));
    await configureTestingModule();

    expect(component).toBeTruthy();
  });
});
