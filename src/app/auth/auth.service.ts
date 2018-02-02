import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

  private userSource: Subject<User> = new ReplaySubject<User>(1);
  public readonly user: Observable<User> = this.userSource.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<User>('auth/user')
      .subscribe(
        (user: User) => this.userSource.next(user),
        (e: HttpErrorResponse) => this.userSource.next(null)
      );
  }
}
