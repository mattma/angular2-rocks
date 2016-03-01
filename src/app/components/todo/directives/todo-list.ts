import {Component, OnInit, OnDestroy} from 'angular2/core';
import {List} from 'immutable';
import {ITodo, ITodosState} from '../redux/actions/todo';
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
    <ul class="todo-list">
      <li *ngFor="#todo of todos
        | term: term
        | search: currentFilter"
        >
        <todo-item
          [todo]="todo"
          [isEditing]="isEditing"
          (toggleEditing)="toggleEditing($event)"
          (toggle)="onTodoClick($event)"
          (remove)="removeTodo($event)"
          (newTodoValue)="onTodoEdit($event)"
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
  isEditing: boolean;

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
    // can editing the current todo input
    this.isEditing = false;
  }

  ngOnInit() {
    const state = this.store.getState();
    this.todos = state.todos;
    this.currentFilter = state.currentFilter;
    this.term = state.term;
  }

  // OnDestroy event handler for clean up
  // remove listener
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onTodoClick(id: string): void {
    this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id: string): void {
    this.store.dispatch(this.todoActions.removeTodo(id));
  }

  onTodoEdit(newTodo): void {
    this.isEditing = false;
    this.store.dispatch(this.todoActions.editTodo(newTodo.id, newTodo.text.trim()));
  }

  toggleEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }
}
