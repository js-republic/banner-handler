import { User } from './user';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthServiceMock extends AuthService {

  public user: Observable<User> = of(new User('1', '', ''));
}
