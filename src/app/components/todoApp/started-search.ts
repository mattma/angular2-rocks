import {Component} from 'angular2/core';
import {Store} from '../../redux/stores/main-store';
import {TodoActions} from '../../redux/actions/todo';

@Component({
  selector: 'started-search',
  template: `
    <div>
      <label for="filter">Filter todo</label>
      <input type="text" #started
        (keyup)="filterWord(started.value)" />
    </div>
  `
})
export class StartedSearch {
  constructor(
    private store: Store,
    private todoActions: TodoActions
  ) { }

  filterWord(term) {
    this.store.dispatch(this.todoActions.startedLetter(term));
  }
}
