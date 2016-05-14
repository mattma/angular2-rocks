import { Component } from '@angular2/core';
import { TodoService } from '../services/todo';

@Component({
  selector: 'clear-completed',
  template: `
    <button class="clear-completed" (click)="clearCompleted()">
      Clear completed
    </button>
  `
})
export class ClearCompleted {
  constructor(private todoService: TodoService) {}

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
