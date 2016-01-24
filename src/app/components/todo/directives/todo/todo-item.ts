import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'todo-item',
  inputs: ['todo'],
  template: `
    <li [ngClass]="{'completed': todo.completed}">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          (change)="toggle.emit(todo.id)"
          [checked]="todo.completed"
        />
        <label>{{todo.text}}</label>
        <button class="destroy" (click)="remove.emit(todo.id)"></button>
      </div>
    </li>
  `
})
export class TodoItem {
  @Output() toggle: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
}
