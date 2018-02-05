import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {anyString, instance, mock, when} from 'ts-mockito';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSortModule,
  MatToolbarModule
} from '@angular/material';

import {MomentModule} from 'angular2-moment';
import {FileUploadModule} from 'ng2-file-upload';

import {BannersComponent} from './banners.component';
import {FormComponent} from './form/form.component';

import {BannerService} from './banner/banner.service';

import {AliciaKeys} from '../commons/aliciakeys.pipe';
import {LoadingService} from '../loader/loading.service';
import {of} from 'rxjs/observable/of';
import {Banner} from './banner/banner.model';

describe('BannerComponent', () => {

  let component: BannersComponent;
  let mockedBannerService: BannerService;
  let mockedLoadingService: LoadingService;
  let fixture: ComponentFixture<BannersComponent>;

  beforeEach(async(() => {

    mockedBannerService = mock(BannerService);
    mockedLoadingService = mock(LoadingService);

    when(mockedBannerService.loadBanners()).thenReturn(of([new Banner()]));
    when(mockedBannerService.getImgUrlFromPath(anyString())).thenReturn(of(''));

    TestBed.configureTestingModule({
      providers: [
        {provide: LoadingService, useValue: instance(mockedLoadingService)},
        {provide: BannerService, useValue: instance(mockedBannerService)},
      ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatSidenavModule,
        MomentModule,
        FileUploadModule,
        BrowserAnimationsModule
      ],
      declarations: [
        BannersComponent,
        FormComponent,
        AliciaKeys
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
