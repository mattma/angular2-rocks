import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Store} from '../../common/stores/main-store';
import {TodoActions} from './redux/actions/todo';

// encapsulate each filter passing an identifier through the attribute
// filter. Within FilterLink each click event passes down the filter
// (input attribute) and dispatch the corresponding filter action.
@Component({
  selector: 'filter-link',
  inputs: ['filter'],
  template: `
    <a href="#"
      (click)="applyFilter(filter);"
      [ngClass]="{'active': active, 'inactive': !active}"
      >
      <ng-content></ng-content>
    </a>
  `
})
export class FilterLink implements OnInit, OnDestroy {
  active: boolean;
  filter: string;
  protected unsubscribe: Function;

  constructor(
    private store: Store,
    private todoActions: TodoActions
  ) {
    this.unsubscribe = this.store.subscribe(state => this.updateActive(state));
  }

  ngOnInit() {
    // set initial state
    this.updateActive();
  }

  ngOnDestroy() {
    // remove change listener
    this.unsubscribe();
  }

  // Helper methods
  applyFilter(filter) {
    this.store.dispatch(this.todoActions.setCurrentFilter(filter));
  }

  private updateActive(state = this.store.getState()) {
    this.active = (this.filter === state.currentFilter);
  }
}
