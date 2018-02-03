import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthServiceMock {

  public readonly user: Observable<User> = of(new User('1', '', ''));
}
