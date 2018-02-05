import { async, TestBed } from '@angular/core/testing';

import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { LoaderComponent } from './loader/loader.component';
import { LoadingService } from './loader/loading.service';
import { AuthService } from './auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      // const mockedAuthService = mock(AuthService);
      // when(mockedAuthService.user).thenReturn(of(new User('1', 'Mathieu', '/avatar.png')));
      TestBed.configureTestingModule({
        providers: [
          { provide: AuthService, useClass: AuthService },// instance(mockedAuthService) },
          LoadingService
        ],
        imports: [MatToolbarModule, RouterTestingModule, HttpClientTestingModule],
        declarations: [AppComponent, UserInfosComponent, LoaderComponent]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

      expect(app).toBeTruthy();
    })
  );

  it(
    'should render title in a h1 tag',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.debugElement.nativeElement;

      fixture.detectChanges();

      const selectorText = compiled.querySelector('mat-toolbar span')
        .textContent;

      expect(selectorText).toBe('Gestionnaire de bannière d\'Email');
    })
  );
});
