import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

import {Home} from '../home/home';
import {Counter} from '../counter/counter';
import {AppState} from './app.service';
import {Todo} from '../todo/todo';
import {RouterActive} from '../../common/directives/router-active';

import './app.sass';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  {path: '/', component: Home, name: 'Index', useAsDefault: true},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/counter', component: Counter, name: 'Counter'},
  {path: '/todo', component: Todo, name: 'Todo'},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  {path: '/about', loader: () => require('es6-promise!../about/about')('About'), name: 'About'}
  // {path: '/**', redirectTo: ['Home']}
])
export class App {
  name = 'Angular2 Rocks';
  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}
