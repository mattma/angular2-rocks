import {Component} from 'angular2/core';
import {AppStore} from '../../../common/stores/main-store';

@Component({
  selector: 'status-bar',
  template: `
    <span class="todo-count">
      {{remaining}} of {{total}} remaining
    </span>
  `
})
export class StatusBar {
  constructor(private store: AppStore) {

  }

  get total(): number {
    const state = this.store.getState();
    return state.todos.size;
  }

  get remaining(): number {
    const state = this.store.getState();
    return state.todos.filter(t => t.completed).toList().size;
  }
}