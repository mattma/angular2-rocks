import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'todo-item',
  inputs: ['todo'],
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `],
  template: `
    <div>
      <span [ngClass]="{'completed': todo.completed}">
        {{todo.text}}
      </span>
      <button (click)="toggle.emit(todo.id)">toggle</button>
      <button (click)="remove.emit(todo.id)">remove</button>
    </div>
  `
})
export class TodoItem {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
}
