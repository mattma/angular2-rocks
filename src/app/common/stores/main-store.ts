import {Injectable} from 'angular2/core';
import {compose, createStore, applyMiddleware, Store} from 'redux';
import {List} from 'immutable';

import {BaseStore} from './base-store';
import Reducers from '../../components/todo/reducers';

const isDevMode: boolean = ('development' === process.env.NODE_ENV);
// Create ONLY one store per application
let store: Store;

if (isDevMode) {
  const createLogger = require('redux-logger');
  const persistState = require('redux-localstorage');

  // log only in dev mode
  const logger = createLogger({
    predicate: (getState, action) => isDevMode
  });
  const storage = persistState(null, {
    key: 'rocks',
    deserialize: (state) => {
      if (state) {
        const newState = JSON.parse(state);
        return Object.assign({}, ...newState, {todos: List(newState.todos)});
      }
    }
  });

  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
  const createPersistentStore = compose(storage)(createStoreWithMiddleware);

  store = createPersistentStore(Reducers);
} else {
  store = createStore(Reducers);
}

@Injectable()
export class AppStore extends BaseStore {
  constructor() {
    super(store);
  }
}
