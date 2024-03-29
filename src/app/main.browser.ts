// Providers provided by Angular
import { bootstrap } from '@angular/platform-browser-dynamic';

// Platform and Environment: providers/directives/pipes/store
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { STORE_PROVIDERS } from './common/stores/store-provider';

// App Component: top level component that holds all of our components
import {App, APP_PROVIDERS} from './components/app';
import {APP_SERVICE_PROVIDERS} from './common/services';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {
  return bootstrap(App, [
    ...DIRECTIVES,
    ...PIPES,
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...STORE_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
    ...APP_PROVIDERS
  ])
    .catch(err => console.error(err));
}

/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
