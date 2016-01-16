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
    this.unsubscribe = this.appStore.subscribe(() => {
      let state = this.appStore.getState();

      this.currentFilter = state.currentFilter;
      this.todos = state.todos;
    });
  }

  ngOnDestroy() {
    // remove listener
    this.unsubscribe();
  }
}
