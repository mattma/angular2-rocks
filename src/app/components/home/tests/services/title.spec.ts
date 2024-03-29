import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {Title} from '../../services/title';

describe('Title', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    Title
  ]);

  it('should have http', inject([ Title ], (title) => {
    expect(!!title.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Title ], (title) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    title.getData();
    expect(console.log).toHaveBeenCalled();
    expect(title.getData()).toEqual({ value: 'AngularClass' });
  }));
});
