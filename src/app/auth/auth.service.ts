import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getUser(): Promise<User> {
    return this.http.get<User>('auth/user').toPromise();
  }
}
