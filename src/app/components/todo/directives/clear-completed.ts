import {Component} from 'angular2/core';
import {AppStore} from '../../../common/stores/main-store';
import {TodoActions} from '../redux/actions/todo';

@Component({
  selector: 'clear-completed',
  template: `
    <button class="clear-completed" (click)="clearCompleted()">
      Clear completed
    </button>
  `
})
export class ClearCompleted {
  constructor(
    private store: AppStore,
    private todoActions: TodoActions
  ) { }

  clearCompleted() {
    this.store.dispatch(this.todoActions.clearCompleted());
  }
}
