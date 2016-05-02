import {provideStore} from '@ngrx/store';
import * as reducers from './reducers';

export const STORE_PROVIDERS = [
  provideStore(reducers)
];
