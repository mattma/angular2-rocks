import {Component, OnDestroy} from 'angular2/core';
import {Store} from '../../redux/stores/main-store';
import {TodoItem} from './todo-item';
import {SearchPipe} from './search.pipe';

interface Unsubscribe {
  (): void;
}

@Component({
  selector: 'todo-list',
  directives: [TodoItem],
  pipes: [SearchPipe],
  template: `
    <ul>
      <todo-item *ngFor="#todo of todos | search: status"
        [completed]="todo.completed"
        [id]="todo.id"
        >
        {{todo.text}}
      </todo-item>
    </ul>
  `
})
export class TodoList implements OnDestroy {
  status: string;
  todos: any[];
  unsubscribe: Unsubscribe;

  constructor(
    private store: Store
  ) {
    // registered a listener, Once within our listener, read the current
    // state using `store.getState` Subscribe returns a function
    // that we can use to unsubscribe
    this.unsubscribe = this.store.subscribe((state) => {
      this.status = state.currentFilter;
      this.todos = state.todos;
    });
  }

  // OnDestroy event handler for clean up
  ngOnDestroy() {
    // remove listener
    this.unsubscribe();
  }
}
