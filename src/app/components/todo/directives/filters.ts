import {Component} from 'angular2/core';
import {FilterLink} from './filters/filter-link';

@Component({
  selector: 'filters',
  directives: [FilterLink],
  template: `
    <ul class="filters">
      <filter-link filter="SHOW_ALL">
        All
      </filter-link>
      <filter-link filter="SHOW_ACTIVE">
        Active
      </filter-link>
      <filter-link filter="SHOW_COMPLETED">
        Completed
      </filter-link>
    </ul>
  `
})
export class Filters { }
