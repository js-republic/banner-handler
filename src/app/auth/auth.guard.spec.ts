import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AuthGard } from './auth.guard';

import { AuthService } from './auth.service';
import { AuthServiceMock } from './auth.service.mock';

const providers  = [
	AuthGard,
	HttpClient,
	HttpHandler,
	{
		provide: AuthService,
		useValue: AuthServiceMock
	},
	{
		provide: Router,
		useClass: class { navigate = jasmine.createSpy('navigate'); }
	}
];

describe('AuthGard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers
    });
  });

  it('should ...', inject([AuthGard], (guard: AuthGard) => {
    expect(guard).toBeTruthy();
  }));
});
