// our root app component
import {Component} from 'angular2/core';

import {StatusBar} from './directives/status-bar';
// import {StartedSearch} from './directives/started-search';
import {AddTodo} from './directives/add-todo';
// import {AllCompleted} from './directives/all-completed';
import {TodoList} from './directives/todo-list';
import {Filters} from './directives/filters';
// import {ClearCompleted} from './directives/clear-completed';

import './styles/todo-mvc.sass';

@Component({
  selector: 'app',
  directives: [
    StatusBar,
    AddTodo,
    TodoList
    // ilters
    // StartedSearch,
    // ClearCompleted,
    // AllCompleted
  ],
  template: `
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <!--<started-search></started-search>-->
        <add-todo></add-todo>
      </header>
      <section class="main">
        <!--<all-completed></all-completed>-->
        <todo-list></todo-list>
      </section>
      <footer class="footer">
        <status-bar></status-bar>
        <!--<filters></filters>-->
        <!--<clear-completed></clear-completed>-->
      </footer>
    </section>
  `
})
export class Todo {}
