import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './router-active';
import {Home} from '../home/home';
import {Todo} from '../todo/app';

import './app.sass';
const template = require('./app.html');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template,
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive]
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
