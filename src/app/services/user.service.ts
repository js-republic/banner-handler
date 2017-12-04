import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {

  }

  loadUser(): Observable<any[]> {
    return this.http.get<any[]>('/auth/user');
  }

}
