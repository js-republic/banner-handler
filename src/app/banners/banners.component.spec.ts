/**
 * Angular imports
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { MomentModule } from 'angular2-moment';
import { FileUploadModule } from 'ng2-file-upload';

import { BannersComponent } from './banners.component';
import { FormComponent } from './form/form.component';

import { BannerService } from './banner/banner.service';
import { BannerServiceMock } from './banner/banner.service.mock';

import { AliciaKeys } from './aliciakeys.pipe';
import { LoadingService } from '../loader/loading.service';

describe('BannerComponent', () => {

  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService
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
    })
      .overrideComponent(BannersComponent, {
        set: {
          providers: [
            {
              provide: BannerService,
              useValue: new BannerServiceMock(null, null)
            }
          ]
        }
      })
      .compileComponents();
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
