import {Component} from 'angular2/core';
import {FilterLink} from './filters/filter-link';

@Component({
  selector: 'filters',
  directives: [FilterLink],
  template: `
    <ul class="filters">
      <li>
        <filter-link filter="SHOW_ALL">
          All
        </filter-link>
      </li>
      <li>
        <filter-link filter="SHOW_ACTIVE">
          Active
        </filter-link>
      </li>
      <li>
        <filter-link filter="SHOW_COMPLETED">
          Completed
        </filter-link>
      </li>
    </ul>
    <button class="clear-completed">Clear completed</button>
  `
})
export class Filters { }
