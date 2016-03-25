/*
 * Providers provided by Angular
 */
import {bootstrap} from 'angular2/platform/browser';
import {provideInitialState, hotModuleReplacement} from 'angular2-hmr';

/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppState} from './components/app/app.service';
import {App} from './components/app/app';

// import {AppStore} from './common/stores/main-store';
// import {TodoActions} from './components/todo/redux/actions/todo';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialState = {}) {
  let APP_PROVIDERS = [
    provideInitialState(initialState),
    AppState
    // AppStore,
    // TodoActions
  ];

  return bootstrap(App, [
    ...ENV_PROVIDERS,
    ...PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS
  ])
  .catch(err => console.error(err));
}