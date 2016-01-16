import {Component, Inject} from 'angular2/core';
import {TodoActions} from '../../actions/todo.actions';

@Component({
  selector: 'add-todo',
  template:
    `<div>
      <input #todo>
      <button (click)="addTodo(todo)">Add todo</button>
    </div>`
})
export class AddTodo {
  constructor(
    @Inject('AppStore') private appStore,
    private todoActions: TodoActions
  ) { }

  addTodo (input) {
    this.appStore.dispatch(this.todoActions.addTodo(input.value));
    input.value = '';
  }
}
