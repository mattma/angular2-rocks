import {provideStore} from '@ngrx/store';
import {TodoReducer as todos} from './reducers';

export const STORE_PROVIDERS = [
  provideStore({
    todos
  })
];
