import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './router-active';
import {Home} from '../home/home';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive],
  pipes: [],
  styleUrls: [require('./app.sass')],
  template: `
    <header>
      <nav>
        <h1>Hello {{ name }}</h1>
        <ul>
          <li router-active="active">
            <a [routerLink]=" ['Index'] ">Index</a>
          </li>
          <li router-active="active">
            <a [routerLink]=" ['Home'] ">Home</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      Angular2 Rocks starter kit
    </footer>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' /* , useAsDefault: true */ },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'Angular2 Rocks starter kit';
  constructor() {

  }
}
