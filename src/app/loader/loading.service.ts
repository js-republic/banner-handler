import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  private isLoadingSource: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly onLoading: Observable<boolean> = this.isLoadingSource.asObservable();

  constructor() {
  }

  set isLoading(value: boolean) {
    this.isLoadingSource.next(value);
  }
}
