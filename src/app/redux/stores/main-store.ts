import {Injectable} from "angular2/core";
import {createStore} from 'redux';

import {BaseStore} from "./base-store";
import {rootReducer} from '../reducers/root.reducer';

// Create ONLY one store per application
let store = createStore(rootReducer);

@Injectable()
export class Store extends BaseStore {
  constructor() {
    super(store);
  }
}
