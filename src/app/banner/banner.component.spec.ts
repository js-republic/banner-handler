/**
 * Angular imports
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
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
  MatSidenavModule
} from '@angular/material';

import { MomentModule } from 'angular2-moment';
import { FileUploadModule } from 'ng2-file-upload';

/**
 * App imports
 */

import { BannerComponent } from './banner.component';
import { FormComponent } from './form/form.component';

import { BannerService } from './banner.service';
import { BannerServiceMock } from './banner.service.mock';

import { AliciaKeys } from './aliciakeys.pipe';

const imports = [
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
];

const declarations = [
  BannerComponent,
  FormComponent,
  AliciaKeys
];

xdescribe('BannerComponent', () => {

  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports,
      declarations
    })
    .overrideComponent(BannerComponent, {
      set: {
        providers: [
          {
            provide: BannerService,
            useValue: new BannerServiceMock(null)
          }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
