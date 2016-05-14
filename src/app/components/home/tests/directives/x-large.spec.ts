import {
  it,
  // inject,
  injectAsync,
  describe,
  // beforeEachProviders,
  TestComponentBuilder
} from '@angular/compiler/testing';

import { Component } from '@angular/core';
// import {BaseRequestOptions, Http} from 'angular2/http';
// import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {XLarge} from '../../directives/x-large';

describe('x-large directive', () => {
  // Create a test component to test directives
  @Component({
    template: '',
    directives: [ XLarge ]
  })
  class TestComponent {}

  it('should sent font-size to x-large', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<div x-large>Content</div>')
      .createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('x-large');
      });
  }));
});
