import {Component, OnInit, OnDestroy} from 'angular2/core';
import {List} from 'immutable';
import {ITodo, ITodosState} from './types/todo.d';
import {AppStore} from '../../common/stores/main-store';
import {TodoActions} from './redux/actions/todo';
import {TodoItem} from './todo-item';
import {SearchPipe} from './search.pipe';
import {TermPipe} from './term.pipe';

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
      this.currentFilter = state.currentFilter;
      this.todos = state.todos;
      this.term = state.term;
    });
  }

  ngOnInit() {
    this.todos = this.store.getState().todos;
  }

  // OnDestroy event handler for clean up
  ngOnDestroy() {
    // remove listener
    this.unsubscribe();
  }

  onTodoClick(id): void {
    this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id): void {
    this.store.dispatch(this.todoActions.removeTodo(id));
  }
}
