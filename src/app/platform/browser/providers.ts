/*
 * These are globally available services in any component or any other service
 */
import {provide} from 'angular2/core';

// Angular 2
import {FORM_PROVIDERS} from 'angular2/common';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';

import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// Angular 2 Material
// import {MATERIAL_PROVIDERS} from './angular2-material2';

export const PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  // ...MATERIAL_PROVIDERS,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
];
