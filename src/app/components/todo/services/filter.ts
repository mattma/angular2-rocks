import {Injectable} from 'angular2/core';
import {Dispatcher, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import * as type from '../reducers/constant';

@Injectable()
export class FilterService {
  // filter: Observable<string>;

  private setFilter$: Subject<any> = new Subject();

  constructor(
    dispatcher: Dispatcher<any>
  ) {
    this.setFilter$
      .map((filter: string) => ({
        type: type.SET_CURRENT_FILTER,
        payload: filter
      }))
      .subscribe(dispatcher);
  }

  setFilter(filter: string) {
    this.setFilter$.next(filter);
  }
}
