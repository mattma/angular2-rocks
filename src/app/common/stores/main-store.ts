import {Injectable} from 'angular2/core';
import {compose, createStore, applyMiddleware, Store} from 'redux';
import {List} from 'immutable';
const persistState = require('redux-localstorage');

import {BaseStore} from './base-store';
import Reducers from '../../components/todo/reducers';

const isDevMode: boolean = ('development' === process.env.NODE_ENV);
// Create ONLY one store per application
let store: Store;

// map the `createStore` method, could be rewrite in DevMode
let cs: Function = createStore;

// Create persist local storage to save Redux immutable state
const storage = persistState(null, {
  key: 'rocks',
  deserialize: (state) => {
    if (state) {
      const newState = JSON.parse(state);
      return Object.assign({}, ...newState, {todos: List(newState.todos)});
    }
  }
});

if (isDevMode) {
  const createLogger = require('redux-logger');

  // log only in dev mode
  const logger = createLogger({
    predicate: (getState, action) => isDevMode
  });

  // createStoreWithMiddleware
  cs = applyMiddleware(logger)(cs);
}

const createPersistentStore: Function = compose(storage)(cs);
store = createPersistentStore(Reducers);

@Injectable()
export class AppStore extends BaseStore {
  constructor() {
    super(store);
  }
}
