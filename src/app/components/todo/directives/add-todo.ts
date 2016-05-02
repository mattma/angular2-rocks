import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ITodo} from '../models/todo';

@Component({
  selector: 'add-todo',
  template: `
    <input 
      class="new-todo" autofocus #todo
      (keyup.enter)="addTodo(todo)"
      placeholder="What needs to be done?"
      />
  `
})
export class AddTodo {
  constructor(private store: Store<ITodo>) { }

  addTodo(input): void {
    const text = input.value.trim();

    if (text.length !== 0) {
      this.store.dispatch(text);
      input.value = '';
    }
  }
}
