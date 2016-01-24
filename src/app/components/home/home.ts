import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from './providers/title';
import {XLarge} from './directives/x-large';

const template = require('./home.html');

@Component({
  selector: 'home',  // <home></home>
  template,
  // Dependency Injection which providers are in our app
  providers: [Title],
  // tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ]
})
export class Home implements OnInit {
  constructor(
    public title: Title,
    public http: Http
  ) {

  }

  ngOnInit(): any {
    console.log('home component is loaded. used in tests');
  }
}
