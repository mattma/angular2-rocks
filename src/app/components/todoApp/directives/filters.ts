import {Component} from 'angular2/core';
import {FilterLink} from './filters/filter-link';

@Component({
  selector: 'filters',
  directives: [FilterLink],
  template: `
    <p>
      Show:
      <filter-link filter="SHOW_ALL">
        All
      </filter-link>
      &nbsp;
      <filter-link filter="SHOW_ACTIVE">
        Active
      </filter-link>
      &nbsp;
      <filter-link filter="SHOW_COMPLETED">
        Completed
      </filter-link>
    </p>
  `
})
export class Filters { }
