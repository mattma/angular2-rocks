import {Injectable} from "angular2/core";
import {BaseStore} from "./base-store";
import {createStore} from 'redux';

let store = createStore();

@Injectable()
export class Store extends BaseStore {
  constructor() {
    super(store);
  }
}
