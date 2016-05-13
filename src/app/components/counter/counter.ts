import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from './reducers/counter';

interface AppState {
  counter$: number;
}

@Component({
  selector: 'counter',
  template: `
    <p>Counter: {{counter$ | async}}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `
})
export class Counter {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select(s => s.counter);
  }

  increment() {
    this.store.dispatch({type: INCREMENT});
  }

  decrement() {
    this.store.dispatch({type: DECREMENT});
  }

  reset() {
    this.store.dispatch({type: RESET});
  }
}
