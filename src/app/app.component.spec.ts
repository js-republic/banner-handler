import {async, TestBed} from '@angular/core/testing';

import {MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {UserInfosComponent} from './user-infos/user-infos.component';
import {AuthService} from './auth/auth.service';
import {AuthServiceMock} from './auth/auth.service.mock';
import {RouterTestingModule} from '@angular/router/testing';

xdescribe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock}
      ],
      imports: [
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent, UserInfosComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    const selectorText = compiled.querySelector('mat-toolbar span').textContent;

    expect(selectorText).toContain('Gestionnaire de bannière d\'Email');
  }));
});
