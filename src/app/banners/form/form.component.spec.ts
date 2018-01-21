import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

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

import { FileUploadModule } from 'ng2-file-upload';

import { FormComponent } from './form.component';

import { Banner } from '../banner/banner.model';
import { BannerService } from '../banner/banner.service';
import { BannerServiceMock } from '../banner/banner.service.mock';
import { LoadingService } from '../../loader/loading.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

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
        FileUploadModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        FormComponent
      ]
    })
      .overrideComponent(FormComponent, {
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
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.banner = new Banner();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should hide button creating banner && have no picture preview while no file is uploaded.
    Button should be clickable and preview displayed when file uploaded.`, () => {

    const btnClassName = '.save-banner';
    const imgClassName = '.img-container';

    const imgTestPath = '/assets/test/test.jpg';

    let compiled;
    let buttonSave;
    let imgPreview;

    function expectResult({ attr, img }) {

      compiled = fixture.debugElement.nativeElement;

      buttonSave = compiled.querySelector(btnClassName).getAttribute('disabled');
      imgPreview = compiled.querySelector(imgClassName).style.backgroundImage;

      expect(buttonSave).toBe(attr);
      expect(imgPreview).toBe(img);
    }

    fixture.detectChanges();

    expectResult({
      attr: '',
      img: ''
    });

    // Here we consider that picture has been loaded.
    // So the button should not be disabled anymore
    component.pictureLoaded = true;
    component.setBannerPath(imgTestPath);
    fixture.detectChanges();

    expectResult({
      attr: null,
      img: 'url("' + imgTestPath + '")'
    });
  });
});
