import {Injectable} from 'angular2/core';
import {Dispatcher} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

import {STARTED_LETTER} from '../reducers/constant';

@Injectable()
export class TermService {
  private setTerm$: Subject<string> = new Subject();

  constructor(dispatcher: Dispatcher<any>) {
    this.setTerm$
      .map((term: string) => ({
        type: STARTED_LETTER,
        payload: term
      }))
      .subscribe(dispatcher);
  }

  startedLetter(term: string) {
    this.setTerm$.next(term);
  }
}
