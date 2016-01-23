import {Component} from 'angular2/core';
import {AppStore} from '../../../common/stores/main-store';
import {TodoActions} from '../redux/actions/todo';

@Component({
  selector: 'add-todo',
  template: `
    <input class="new-todo" autofocus #todo
      (keyup.enter)="addTodo(todo)"
      placeholder="What needs to be done?"
      />
  `
})
export class AddTodo {
  constructor(
    private store: AppStore,
    private todoActions: TodoActions
  ) { }

  addTodo(input): void {
    this.store.dispatch(this.todoActions.addTodo(input.value));
    input.value = '';
  }
}
