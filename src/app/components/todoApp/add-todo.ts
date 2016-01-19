import {Component} from 'angular2/core';
import {Store} from '../../common/stores/main-store';
import {TodoActions} from './redux/actions/todo';

@Component({
  selector: 'add-todo',
  template: `
    <div>
      <input #todo>
      <button (click)="addTodo(todo)">Add todo</button>
    </div>
  `
})
export class AddTodo {
  constructor(
    private store: Store,
    private todoActions: TodoActions
  ) { }

  addTodo(input): void {
    this.store.dispatch(this.todoActions.addTodo(input.value));
    input.value = '';
  }
}
