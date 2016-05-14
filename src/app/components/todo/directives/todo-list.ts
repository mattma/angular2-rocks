import { Component } from '@ angular2/core';
import { Store } from '@ngrx/store';

import { Todo } from '../services/todo-model';
import { TodoService } from '../services/todo';
import { TodoItem } from './todo-item';
import { SearchPipe } from '../pipes/search';
import { TermPipe } from '../pipes/term';

@Component({
  selector: 'todo-list',
  directives: [TodoItem],
  pipes: [SearchPipe, TermPipe],
  template: `
    <ul class="todo-list">
      <li *ngFor="let todo of todos | search:currentFilter | term:term">
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
  term: string;
  currentFilter: string;
  isEditing: boolean;
  todos: Array<Todo>;

  constructor(private store: Store<any>, private todoService: TodoService) {
    store.select(s => s.todos)
      .subscribe((todos: Array<Todo>) => this.todos = todos);

    store.select(s => s.currentFilter)
      .subscribe((currentFilter: string) => this.currentFilter = currentFilter);

    store.select(s => s.term)
      .subscribe((term: string) => this.term = term);

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
