import {Component, Inject} from 'angular2/core';
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
    @Inject('AppStore') private appStore,
    private todoActions: TodoActions
  ) { }

  onTodoClick(id) {
    this.appStore.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo(id) {
    this.appStore.dispatch(this.todoActions.removeTodo(id));
  }
}
