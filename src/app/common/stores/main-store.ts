import {Injectable} from 'angular2/core';
import {createStore, applyMiddleware, Store} from 'redux';

import {BaseStore} from './base-store';
import {TodoReducer, initialState} from '../../components/todoApp/redux/reducers/todo';

const isDevMode: boolean = ('development' === process.env.NODE_ENV);
// Create ONLY one store per application
let store: Store;

if (isDevMode) {
  const createLogger = require('redux-logger');
  // log only in dev mode
  const logger = createLogger({
    predicate: (getState, action) => isDevMode
  });
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

  store = createStoreWithMiddleware(TodoReducer, initialState);
} else {
  store = createStore(TodoReducer, initialState);
}

@Injectable()
export class AppStore extends BaseStore {
  constructor() {
    super(store);
  }
}
