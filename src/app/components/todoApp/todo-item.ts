import {Component} from 'angular2/core';
import {Store} from '../../redux/stores/main-store';
import {TodoActions} from '../../redux/actions/todo';

@Component({
  selector: 'todo-item',
  inputs: ['completed', 'id'],
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `],
  template: `
    <li (click)="onTodoClick(id)"
      [style.textDecoration]="completed?'line-through':'none'"
      >
      <ng-content></ng-content>
    </li>
  `
})
export class TodoItem {
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
