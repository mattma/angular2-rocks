import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {createStore} from 'redux';
import {rootReducer} from './redux/reducers/root.reducer';
import {TodoActions} from './redux/actions/todo.actions';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './components/todoApp/app';

// The Application Store will hold the Application State.
// This is: the todos Array and the current filter.
const appStore = createStore(rootReducer);

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    // using a string token we have to prepend @Inject(‘AppStore’) on our components.
    provide('AppStore', { useValue: appStore }),
    TodoActions
  ])
  .catch(err => console.error(err));
});
