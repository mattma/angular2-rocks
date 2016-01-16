import {Component} from 'angular2/core';
import {Store} from '../../redux/stores/main-store';
import {TodoActions} from '../../redux/actions/todo.actions';

@Component({
  selector: 'todo',
  inputs: ['completed', 'id'],
  template: `
    <li (click)="onTodoClick(id)"
      [style.textDecoration]="completed?'line-through':'none'">
      <ng-content></ng-content>
    </li>
  `
})
export class Todo {
  constructor(
    private store: Store,
    private todoActions: TodoActions
  ) { }

  onTodoClick(id) {
    this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id) {
    this.store.dispatch(this.todoActions.removeTodo(id));
  }
}
