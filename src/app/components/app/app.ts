import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from '../home/home';
import {AppState} from './app.service';
// import {Todo} from '../todo/app';

import './app.sass';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  directives: [...ROUTER_DIRECTIVES],
  template: require('./app.html')
  // styleUrls: [require('./app.sass')]
})
@RouteConfig([
  {path: '/', component: Home, name: 'Index', useAsDefault: true},
  {path: '/home', component: Home, name: 'Home'},
  // {path: '/todo', component: Todo, name: 'Todo'},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  {path: '/about', loader: () => require('es6-promise!../about/about')('About'), name: 'About'},
  {path: '/**', redirectTo: ['Home']}
])
export class App {
  name = 'Angular2 Rocks';
  constructor(public appState: AppState) {}

  get state() {
    return this.appState.get();
  }

  ngOnInit() {
    console.log('Initial App State', this.state);
  }
}
