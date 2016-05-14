import { Component } from '@angular/core';
import { TodoService } from '../services/todo';

@Component({
  selector: 'all-completed',
  template: `
    <input
      class="toggle-all"
      type="checkbox"
      #toggle
      (click)="completeAll(toggle.checked)">
    <label for="toggle-all">Mark all as complete</label>
  `
})
export class AllCompleted {
  constructor(private todoService: TodoService) { }

  completeAll(isChecked: boolean) {
    this.todoService.completeAll(isChecked);
  }
}
