import {User} from './user';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthServiceMock extends AuthService {
  getUser(): Promise<User> {
    return Promise.resolve(new User('', '', ''));
  }
}
