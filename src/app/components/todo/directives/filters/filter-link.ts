import {Component, Input} from 'angular2/core';
import {Store} from '@ngrx/store';

import {FilterService} from '../../services/filter';

// encapsulate each filter passing an identifier through the attribute
// filter. Within FilterLink each click event passes down the filter
// (input attribute) and dispatch the corresponding filter action.
@Component({
  selector: 'filter-link',
  template: `
    <li>
      <a href="#"
        (click)="setFilter($event, filter)"
        [ngClass]="{'selected': active, 'inactive': !active}"
        >
        <ng-content></ng-content>
      </a>
    </li>
  `
})
export class FilterLink {
  @Input() filter: string;
  currentFilter: string;
  active: boolean;

  constructor(private store: Store, private filterService: FilterService) {
    store.select(s => s.currentFilter)
      .subscribe(filter => {
        this.currentFilter = filter;
        this.active = this.filter === this.currentFilter;
      });
  }

  setFilter(e: Event, filter: string): void {
    e.preventDefault();
    this.filterService.setFilter(filter);
  }
}
