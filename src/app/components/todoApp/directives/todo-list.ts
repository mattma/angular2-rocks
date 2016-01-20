import {Component, OnInit, OnDestroy} from 'angular2/core';
import {List} from 'immutable';
import {ITodo, ITodosState} from '../types/todo.d';
import {AppStore} from '../../../common/stores/main-store';
import {TodoActions} from '../redux/actions/todo';
import {TodoItem} from './todo/todo-item';
import {SearchPipe} from '../pipes/search';
import {TermPipe} from '../pipes/term';

@Component({
  selector: 'todo-list',
  directives: [TodoItem],
  pipes: [SearchPipe, TermPipe],
  template: `
    <ul>
      <li *ngFor="#todo of todos
        | term: term
        | search: currentFilter"
        >
        <todo-item
          [todo]="todo"
          (toggle)="onTodoClick($event)"
          (remove)="removeTodo($event)"
          >
        </todo-item>
      </li>
    </ul>
  `
})
export class TodoList implements OnInit, OnDestroy, ITodosState {
  term: string;
  currentFilter: string;
  todos: List<ITodo>;
  protected unsubscribe: Function;

  constructor(
    private store: AppStore,
    private todoActions: TodoActions
  ) {
    // registered a listener, Once within our listener, read the current
    // state using `store.getState` Subscribe returns a function
    // that we can use to unsubscribe
    this.unsubscribe = this.store.subscribe(state => {
      this.todos = state.todos;
      this.currentFilter = state.currentFilter;
      this.term = state.term;
    });
  }

  ngOnInit() {
    const state = this.store.getState();
    this.todos = state.todos;
    this.currentFilter = state.currentFilter;
    this.term = state.term;
  }

  // OnDestroy event handler for clean up
  // remove listener
  ngOnDestroy() {
    this.unsubscribe();
  }

  onTodoClick(id): void {
    this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id): void {
    this.store.dispatch(this.todoActions.removeTodo(id));
  }
}
