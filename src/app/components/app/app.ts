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
  template: require('./app.html')
  // styleUrls: [require('./app.sass')]
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home' /* , useAsDefault: true */},
  {path: '/todo', component: Todo, name: 'Todo'},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  {path: '/about', loader: () => require('es6-promise!../about/about')('About'), name: 'About'},
  {path: '/**', redirectTo: ['Home']}
])
export class App {
  name = 'Angular2 Rocks';
  constructor() { }
}
