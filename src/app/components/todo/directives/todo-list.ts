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
      <li *ngFor="let todo of todos">
        <todo-item
          [todo]="todo"
          [isEditing]="isEditing"
          (toggleEditing)="toggleEditing($event)"
          (toggle)="onToggleTodo($event)"
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
  todos: Observable<Todo[]>;

  constructor(private store: Store<any>, private todoService: TodoService) {
    store.select('todos')
      .subscribe(todos => this.todos = todos);

    // can editing the current todo input
    this.isEditing = false;
  }

  onToggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: string): void {
    this.todoService.removeTodo(id);
  }

  onTodoEdit(newTodo: Todo): void {
    this.isEditing = false;
    this.todoService.updateTodo(newTodo);
  }

  toggleEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }
}
