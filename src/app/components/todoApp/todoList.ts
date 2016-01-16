import {Component, Inject, OnDestroy} from 'angular2/core';
import {Todo} from './todo';
import {VisibleTodosPipe} from './visibleTodosPipe';

interface Unsubscribe {
  (): void;
}

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <todo
        *ngFor="#todo of todos | visibleTodos:currentFilter"
        [completed]="todo.completed"
        [id]="todo.id"
      >{{todo.text}}</todo>
    </ul>
  `,
  directives: [Todo],
  pipes: [VisibleTodosPipe]
})
export class TodoList implements OnDestroy {
  currentFilter: string;
  todos: any[];
  unsubscribe: Unsubscribe;

  constructor(
    @Inject('AppStore') private appStore
  ) {
    // registered a listener, Once within our listener, read the current
    // state using `appStore.getState` Subscribe returns a function
    // that we can use to unsubscribe
    this.unsubscribe = this.appStore.subscribe(() => {
      let state = this.appStore.getState();

      this.currentFilter = state.currentFilter;
      this.todos = state.todos;
    });
  }

  // OnDestroy event handler for clean up
  ngOnDestroy() {
    // remove listener
    this.unsubscribe();
  }
}
