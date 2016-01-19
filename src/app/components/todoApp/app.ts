// our root app component
import {Component} from 'angular2/core';
import {StartedSearch} from './directives/started-search';
import {AddTodo} from './directives/add-todo';
import {TodoList} from './directives/todo-list';
import {Filters} from './directives/filters';

@Component({
  selector: 'app',
  directives: [AddTodo, TodoList, Filters, StartedSearch],
  template: `
    <div>
      <started-search></started-search>
      <add-todo></add-todo>
      <todo-list></todo-list>
      <filters></filters>
    </div>
  `
})
export class App { }
