import {provideStore} from '@ngrx/store';
import {
  TodoReducer as todos,
  FilterReducer as filter
} from './reducers';

export const STORE_PROVIDERS = [
  provideStore({
    todos,
    filter
  })
];
