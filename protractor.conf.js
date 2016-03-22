require('ts-node/register');
var SpecReporter = require('jasmine-spec-reporter');
var helpers = require('./webpack.helpers');

exports.config = {
  baseUrl: 'http://localhost:4200/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/app/**/**.e2e.ts'),
    helpers.root('src/app/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    // add jasmine spec reporter: require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: true
    }));
    browser.ignoreSynchronization = true;
  },

  seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar",

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
   useAllAngular2AppRoots: true
};
