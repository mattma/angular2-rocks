import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './router-active';
import {Home} from '../home/home';
import {Todo} from '../todo/app';

import './app.sass';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive],
  template: `
    <header>
      <h1>{{name}}</h1>
      <nav>
        <ul>
          <li router-active="active">
            <a [routerLink]="['Home']">Home</a>
          </li>
          <li router-active="active">
            <a [routerLink]="['Todo']">Todo</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      Angular2 Rocks!
    </footer>
  `
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home' /* , useAsDefault: true */},
  {path: '/todo', component: Todo, name: 'Todo'},
  {path: '/**', redirectTo: ['Home']}
])
export class App {
  name = 'Angular2 Rocks';
  constructor() { }
}
