import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private userSource: Subject<User> = new AsyncSubject();

  public get user(): Observable<User> {
    return this.userSource.asObservable();
  }

  constructor(private http: HttpClient) {
    this.http.get<User>('auth/user')
      .subscribe(
        (user: User) => {
          this.userSource.next(user);
          this.userSource.complete();
        },
        (e: HttpErrorResponse) => {
          this.userSource.next(null);
          this.userSource.complete();
        }
      );
  }
}
