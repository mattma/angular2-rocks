import {Component, OnInit, Input} from 'angular2/core';
import {Store} from '@ngrx/store';

// import {FilterService} from '../../services/filter';

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
export class FilterLink implements OnInit, OnDestroy {
  @Input() filter: string;
  currentFilter: string;
  active: boolean;

  constructor(private store: Store, private filterService: FilterService) {
    store.select('filter')
      .subscribe(filter => this.currentFilter = filter);
  }

  ngOnInit() {
    this.updateActive(); // set initial state
  }
  
  setFilter(e: Event, filter: string): void {
    e.preventDefault();
    console.log('filter: ', filter);
    // this.filterService.setFilter(filter);
  }

  private updateActive(): void {
    this.active = this.filter === this.currentFilter;
  }
}
