import {Component, OnInit, OnDestroy} from 'angular2/core';
import {AppStore} from '../../../../common/stores/main-store';
import {TodoActions} from '../../redux/actions/todo';

// encapsulate each filter passing an identifier through the attribute
// filter. Within FilterLink each click event passes down the filter
// (input attribute) and dispatch the corresponding filter action.
@Component({
  selector: 'filter-link',
  inputs: ['filter'],
  template: `
    <li>
      <a href="#"
        (click)="applyFilter($event, filter)"
        [ngClass]="{'selected': active, 'inactive': !active}"
        >
        <ng-content></ng-content>
      </a>
    </li>
  `
})
export class FilterLink implements OnInit, OnDestroy {
  active: boolean;
  filter: string;
  protected unsubscribe: Function;

  constructor(
    private store: AppStore,
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
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // Helper methods
  applyFilter(e: Event, filter: string): void {
    e.preventDefault();
    this.store.dispatch(this.todoActions.setCurrentFilter(filter));
  }

  private updateActive(state = this.store.getState()): void {
    this.active = (this.filter === state.currentFilter);
  }
}
