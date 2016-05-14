import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Todo } from '../services/todo-model';

@Component({
  selector: 'todo-item',
  template: `
    <li [ngClass]="{'completed': todo.completed}">
      <div class="view" *ngIf="!isEditing">
        <input
          class="toggle"
          type="checkbox"
          (change)="toggle.emit(todo.id)"
          [checked]="todo.completed"
        />
        <label (dblclick)="toggleEditing.emit(true)">{{todo.text}}</label>
        <button class="destroy" (click)="remove.emit(todo.id)"></button>
      </div>
      <input
        type="text"
        class="edit"
        #editTodo
        [style.display]="isEditing?'block':'none'"
        [value]="todo.text"
        (keyup.enter)="newTodoValue.emit({id: todo.id, text: editTodo.value})"
        />
    </li>
  `
})
export class TodoItem {
  @Input() todo: Todo;
  @Input() isEditing: boolean;
  @Output() toggle: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() newTodoValue: EventEmitter<string> = new EventEmitter();
  @Output() toggleEditing: EventEmitter<boolean> = new EventEmitter();
}
