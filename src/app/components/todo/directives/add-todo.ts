import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from '../services/todo';

@Component({
  selector: 'add-todo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input 
      class="new-todo" autofocus #todo
      (keyup.enter)="addTodo(todo)"
      placeholder="What needs to be done?"
      />
  `
})
export class AddTodo {
  constructor(private todoService: TodoService) { }

  addTodo(input): void {
    const text = input.value.trim();

    if (text.length !== 0) {
      this.todoService.createNewTodo(text);
      input.value = '';
    }
  }
}
