import { AuthService } from './auth.service';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from './user';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should return null user when server responds HTTP error',
    inject([HttpTestingController, AuthService],
      (httpMock: HttpTestingController, service: AuthService) => {

        service.user.subscribe(user => {
          expect(user).toBe(null);
        });

        httpMock.expectOne('auth/user').error(new ErrorEvent('401'));
      })
  );

  it('should return user when server responds one',
    inject([HttpTestingController, AuthService],
      (httpMock: HttpTestingController, service: AuthService) => {

        const expectedUser = new User('1', 'Mathieu', 'avatar.png');

        service.user.subscribe(user => {
          expect(user).toBe(expectedUser);
        });

        httpMock.expectOne('auth/user').flush(expectedUser);
      })
  );
});
