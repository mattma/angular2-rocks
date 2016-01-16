// our root app component
import {Component} from 'angular2/core';
import {AddTodo} from './add-todo';
import {TodoList} from './todo-list';
import {Filters} from './filters';

@Component({
  selector: 'app',
  directives: [AddTodo, TodoList, Filters],
  template: `
    <div>
      <add-todo></add-todo>
      <todo-list></todo-list>
      <filters></filters>
    </div>
  `
})
export class App { }
