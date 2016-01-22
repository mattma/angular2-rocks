import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from './providers/title';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',  // <home></home>
  // Dependency Injection which providers are in our app
  providers: [Title],
  // tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  template: require('./home.html')
})
export class Home {
  constructor(
    public title: Title,
    public http: Http
  ) {

  }
}
