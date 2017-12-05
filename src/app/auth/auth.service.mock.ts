import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceMock extends AuthService {

  getUser(): Promise<User> {

  	return Promise.resolve({
  		id: '',
  		avatar: '',
  		username: ''
  	});
  }
}
