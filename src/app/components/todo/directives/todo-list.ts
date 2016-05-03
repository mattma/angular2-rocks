import {Component} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Todo} from '../services/todo-model';
import {TodoService} from '../services/todo';
import {TodoItem} from './todo-item';
// import {SearchPipe} from '../pipes/search';
// import {TermPipe} from '../pipes/term';

// | term: term
// | search: currentFilter"
@Component({
  selector: 'todo-list',
  directives: [TodoItem],
  // pipes: [SearchPipe, TermPipe],
  template: `
    <ul class="todo-list">
      <li *ngFor="let todo of todo">
        <todo-item
          [todo]="todo"
          [isEditing]="isEditing"
          (toggleEditing)="toggleEditing($event)"
          (toggle)="onTodoClick($event)"
          (remove)="removeTodo($event)"
          (newTodoValue)="onTodoEdit($event)"
          >
        </todo-item>
    </ul>
  `
})
export class TodoList {
  // term: string;
  // currentFilter: string;
  isEditing: boolean;
  todo: Observable<Todo[]>;

  constructor(private store: Store<any>, private todoService: TodoService) {
    store.select('todos')
      .subscribe(todos => {
        console.log('todos: ', todos);
        this.todo = todos;
      });
    // // registered a listener, Once within our listener, read the current
    // // state using `store.getState` Subscribe returns a function
    // // that we can use to unsubscribe
    // this.unsubscribe = this.store.subscribe(state => {
    //   this.todos = state.todos;
    //   this.currentFilter = state.currentFilter;
    //   this.term = state.term;
    // });
    // // can editing the current todo input
    this.isEditing = false;
  }

  onTodoClick(id: string): void {
    // this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id: string): void {
    // this.store.dispatch(this.todoActions.removeTodo(id));
  }

  onTodoEdit(newTodo: Todo): void {
    this.isEditing = false;
    this.todoService.updateTodo(newTodo);
  }

  toggleEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }
}
