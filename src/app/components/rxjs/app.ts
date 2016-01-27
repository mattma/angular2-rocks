import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {JSONP_PROVIDERS} from 'angular2/http';
import {App} from './app';
import {WikipediaService} from './wikipedia-service'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Wikipedia Search</h2>
      <input type="text" [ngFormControl]="term"/>
      <ul>
        <li *ngFor="#item of items | async">{{item}}</li>
      </ul>
    </div>
  `
})
export class App {
  items: Observable<Array<string>>;
  term = new Control();
  constructor(private wikipediaService: WikipediaService) {
    this.items = wikipediaService.search(this.term.valueChanges);
  }
}
