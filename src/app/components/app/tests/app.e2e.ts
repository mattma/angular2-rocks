import {
  it,
  describe,
  beforeEach,
  expect
} from 'angular2/testing';

describe('App', () => {
  beforeEach(() => {
    browser.get('/');
    console.log('wat');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 rocks';
    expect(subject).toEqual(result);
  });

  it('should have <header>', () => {
    let subject = element(by.css('app header')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <main>', () => {
    let subject = element(by.css('app main')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <footer>', () => {
    let subject = element(by.css('app footer')).getText();
    let result  = 'Angular2 rocks';
    expect(subject).toEqual(result);
  });
});
