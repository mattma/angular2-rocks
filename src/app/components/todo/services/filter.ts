import { Injectable } from '@angular/core';
import { Dispatcher } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import * as type from '../reducers/constant';

@Injectable()
export class FilterService {
  private setFilter$: Subject<string> = new Subject();

  constructor(dispatcher: Dispatcher<any>) {
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
