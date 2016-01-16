import {Injectable} from 'angular2/core';
import {createStore} from 'redux';

import {BaseStore} from './base-store';
import {TodoReducer} from '../reducers/todo';

// Create ONLY one store per application
let store = createStore(TodoReducer);

@Injectable()
export class Store extends BaseStore {
  constructor() {
    super(store);
  }
}
