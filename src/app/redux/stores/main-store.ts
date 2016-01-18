import {Injectable} from 'angular2/core';
import {createStore, applyMiddleware} from 'redux';

import {BaseStore} from './base-store';
import {TodoReducer} from '../reducers/todo';

const isDevMode: boolean = (process.env.NODE_ENV === 'development');
// Create ONLY one store per application
let store;

if (isDevMode) {
  const createLogger = require('redux-logger');
  // log only in dev mode
  const logger = createLogger({
    predicate: (getState, action) => isDevMode
  });
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

  store = createStoreWithMiddleware(TodoReducer);
} else {
  store = createStore(TodoReducer);
}

@Injectable()
export class Store extends BaseStore {
  constructor() {
    super(store);
  }
}
