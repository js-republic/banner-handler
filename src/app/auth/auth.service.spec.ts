import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthServiceMock } from './auth.service.mock';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceMock, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([AuthServiceMock], (service: AuthServiceMock) => {
    expect(service).toBeTruthy();
  }));
});
