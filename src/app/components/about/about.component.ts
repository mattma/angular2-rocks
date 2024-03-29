import { Component, OnInit } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  template: `Dynamically loading about page`
})
export class About implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('hello `About` component');
  }
}
