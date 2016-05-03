import {Component} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Todo} from '../services/todo-model';

@Component({
  selector: 'status-bar',
  template: `
    <span class="todo-count">
      {{remaining}} {{remaining > 1 ? 'items' : 'item'}} left
    </span>
  `
})
export class StatusBar {
  todos: Observable<Todo[]>;

  constructor(private store: Store) {
    store.select('todos')
      .subscribe((todos: Todo[]) => this.todos = todos);
  }

  get remaining(): number {
    return this.todos.filter(t => !t.completed).length;
  }
}
