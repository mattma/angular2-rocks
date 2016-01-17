// our root app component
import {Component} from 'angular2/core';
import {AddTodo} from './add-todo';
import {StartedSearch} from './started-search';
import {TodoList} from './todo-list';
import {Filters} from './filters';

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
