import {Injectable} from 'angular2/core';
import {Dispatcher} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

import * as type from '../reducers/constant';

@Injectable()
export class FilterService {
  private setFilter$: Subject<string> = new Subject();

  constructor(dispatcher: Dispatcher<string>) {
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
