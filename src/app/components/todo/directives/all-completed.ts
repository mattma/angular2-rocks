import {Component} from 'angular2/core';
import {AppStore} from '../../../common/stores/main-store';
import {TodoActions} from '../redux/actions/todo';

@Component({
  selector: 'all-completed',
  template: `
    <input
      class="toggle-all"
      type="checkbox"
      (click)="completeAll()">
    <label for="toggle-all">Mark all as complete</label>
  `
})
export class AllCompleted {
  constructor(
    private store: AppStore,
    private todoActions: TodoActions
  ) { }

  completeAll() {
    this.store.dispatch(this.todoActions.completeAll());
  }
}
