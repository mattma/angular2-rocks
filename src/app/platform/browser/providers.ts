/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

// Angular 2 Material
// import { MATERIAL_PROVIDERS } from './angular2-material2';

export const PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  // ...MATERIAL_PROVIDERS,
  ...ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];
