import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import {AppState} from '../app/app.service';
import {Title} from './services/title';
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
  data = { value: '' };

  constructor(public appState: AppState, public title: Title) { }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
  }
}
