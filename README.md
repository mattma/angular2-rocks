# Angular2 Rocks Starter Kit

[![Build Status](https://travis-ci.org/mattma/angular2-rocks.svg?branch=master)](https://travis-ci.org/mattma/angular2-rocks)
[![Dependency Status](https://david-dm.org/mattma/angular2-rocks.svg)](https://david-dm.org/mattma/angular2-rocks)
[![devDependency Status](https://david-dm.org/mattma/angular2-rocks/dev-status.svg)](https://david-dm.org/mattma/angular2-rocks#info=devDependencies)
[![Issue Stats](http://issuestats.com/github/mattma/angular2-rocks/badge/pr?style=flat-square)](http://issuestats.com/github/mattma/angular2-rocks)
[![Issue Stats](http://issuestats.com/github/mattma/angular2-rocks/badge/issue?style=flat)](http://issuestats.com/github/mattma/angular2-rocks)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript fast. Using a [Webpack](http://webpack.github.io/) for building our files and assisting with boilerplate. We're also using Protractor for our end-to-end story and Karma for our unit tests.

* Best practices in file and application organization for Angular 2.
* Ready to go build system using Webpack for working with TypeScript.
* Angular 2 examples that are ready to go when experimenting with Angular 2.
* A great Angular 2 seed repo for anyone who wants to start their project.
* Testing Angular 2 code with Jasmine and Karma.
* Coverage with Istanbul and Karma
* End-to-end Angular 2 code using Protractor.
* Type manager with [tsd](http://definitelytyped.org/tsd/)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) 
    Ensure you're running the latest versions Node `v4.1.x`+ and NPM `2.14.x`+
* [PhantomJS](http://phantomjs.org/)
* `typescript` (`npm install --global typescript`)

## Quick start

> Clone/Download the repo then edit `app.ts` inside [`/src/app/app.ts`](/src/app/app.ts)

```bash
# clone our repo
git clone https://github.com/mattma/angular2-rocks

# change directory to our repo
cd angular2-rocks

# install the repo with npm
npm install

# start the server
npm start

# go to `http://localhost:4200` in your browser
open http://localhost:4200
```

### File Structure

We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:

```
angular2-webpack-starter/
 ├──src/                       * source files that will be compiled to javascript
 |   ├──main.ts                * entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──vendor.ts              * vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   └──app.ts             * a simple version of our App component
 │   │
 │   └──assets/                * static assets are served here
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──human.txt          * for humans to know who the developers are
 │
 ├──test/                      * global unit tests and end-to-end tests
 │
 ├──spec-bundle.js             * ignore this magic that sets up our angular 2 testing environment
 ├──karma.config.js            * karma config for our unit tests
 ├──protractor.config.js       * protractor config for our end-to-end tests
 │
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──tsd.json                   * typings manager
 ├──package.json               * what npm uses to manage it's dependencies
 │
 ├──webpack.config.js          * development webpack config
 ├──webpack.test.config.js     * testing webpack config
 └──webpack.prod.config.js     * production webpack config
```

## Libraries

#### [immutable.js](https://facebook.github.io/immutable-js/)

The benefit of using immutable data is that dirty checking does not need to perform a deep equality check. If every mutation returns a new object, dirty checking can use a blazingly fast strict equality check

## Scripts

#### server

```bash
npm start # alias: npm run server:dev
npm run server # (default: dev)
npm run server:dev
npm run server:prod
```

It starts a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:4200` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:4200/`).


#### build

```bash
npm run build # (default: prod)
npm run build:dev
npm run build:prod
```

When `build` command is run, it will auto trigger an clean method to remove existing `dist` folder, so it will make sure that it always have up-to-date build files.


#### watch

```bash
npm run watch # (default: dev)
npm run watch:dev
npm run watch:prod
```

#### tests

```bash
npm run test
npm run e2e
npm run ci # run both e2e and test
```

make sure you have webdriver running and a sever for the client app before you run `e2e` tests. 

webdriver scripts can be used for end-to-end.

```bash
npm run webdriver:update
npm run webdriver:start
```

#### clean

```bash
npm run clean
npm run clean:dist
```

#### lint

```bash
npm run lint
```

#### tsd

```bash
npm run tsd
npm run tsd:clean
```

#### doc

```bash
npm run doc
```

It will generate the documenation of the current application via [typedoc](https://www.npmjs.com/package/typedoc).


## TypeScript

> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously. Do now `npm install --global typescript`.


## Frequently asked questions

* What's the current browser support for Angular 2 Beta?
  * Please view the updated list of [browser support for Angular 2](https://github.com/angularclass/awesome-angular2#current-browser-support-for-angular-2)
  
* Why is my service, aka provider, is not injecting parameter correctly?
  * Please use `@Injectable()` for your service for typescript to correctly attach the metadata (this is a TypeScript problem)

* How do I start the app when I get `EACCES` and `EADDRINUSE` errors?
  * The `EADDRINUSE` error means the port `3000` is currently being used and `EACCES` is lack of permission for webpack to build files to `./dist/`
  
* How to use `sass` for css?
 * `loaders: ['raw-loader','sass-loader']` and `@Component({ styles: [ require('./filename.scss') ] })` see issue [#136](https://github.com/AngularClass/angular2-webpack-starter/issues/136)
 
* How do I test a Service?
 * See issue [#130](https://github.com/AngularClass/angular2-webpack-starter/issues/130#issuecomment-158872648)

* How do I make the repo work in a virtual machine?
  * You need to use `0.0.0.0` so revert these changes [#205](https://github.com/AngularClass/angular2-webpack-starter/pull/205/files)

* What are the naming conventions for Angular 2?
 * please see issue [#185](https://github.com/AngularClass/angular2-webpack-starter/issues/185) and PR [196](https://github.com/AngularClass/angular2-webpack-starter/pull/196)


## Other Seed/Starter/Example Repos
* [ng2-play (Pawel Kozlowski)](https://github.com/pkozlowski-opensource/ng2-play)
  * Client only, Minimalist, SystemJS, Gulp, TypeScript
* [angular2-seed (Minko Gechev)](https://github.com/mgechev/angular2-seed)
  * Client only, SystemJS, Gulp, TypeScript, TSD, Versioned, Env Dev/Prod
* [ng2-lab (Roland Groza)](https://github.com/rolandjitsu/ng2-lab)
  * Client only, ES6, TypeScript, Firebase, Gulp, Ci, TSD, TSLint
* [ng2-jspm-seed (Rob Wormald)](https://github.com/robwormald/ng2-jspm-seed)
  * Client only, TypeScript, TSD, Gulp, JSPM, Minimalist
* [babel-angular2-app (Shuhei Kagawa)](https://github.com/shuhei/babel-angular2-app)
  * Client only, Minimalist, Babel, ES6+, browserify

## Resources

* [Sites built with Angular2](http://builtwithangular2.com/)
* [Angular official site](https://angular.io/)
* [Awesome angular2](https://github.com/AngularClass/awesome-angular2) and its [web view](http://angularclass.github.io/awesome-angular2/)
* [Curated list of resources for learning how to Angular2](http://www.angular2.com/)
* [Learn angular2](http://learnangular2.com/)
* [Angular2 Education](https://gitlab.com/xiadd/angular2-education)
* [Angular2 Education](https://github.com/timjacobi/angular2-education)
* [Angular2 Learning](https://github.com/jmcunningham/AngularJS2-Learning)
* [Reddit Angular2](https://www.reddit.com/r/Angular2) made for solving problems and asking questions about this new version of AngularJS.
* [stackoverflow angular2](http://stackoverflow.com/questions/tagged/angular2)

#### Blog

* [thoughtram](http://blog.thoughtram.io/categories/angular-2/)
* [syntaxsuccess](http://www.syntaxsuccess.com/angular-2-articles)
* [onehungrymind](http://onehungrymind.com/)
* [Angular2 Quickly](http://www.xplatform.rocks/)
* [Victor Savkin](http://victorsavkin.com/)
* [Jvan Demo](http://www.jvandemo.com/)
* [Ionic Angular2 Series](http://blog.ionic.io/angular-2-series-introduction/)
* [Angular2 on Flipboard](https://flipboard.com/@techieshravan/the-angular-2-njcqu6i8y?utm_content=bufferd4db5&utm_medium=Tweet&utm_source=Twitter&utm_campaign=Future+Insights+Twitter)

#### Video

* [Angular U](https://angularu.com/ng/videos)

#### Post

* [try angular2 today](http://swirlycheetah.com/try-angular2-today/)
* [The Beginner’s Preemptive Guide To AngularJS 2 Beta](http://antjanus.com/blog/tutorials/the-beginners-preemptive-guide-to-angularjs-2-alpha/)
* [Angular 2 for AngularJS developers](https://angularclass.com/angular-2-for-angularjs-developers/)
* [Angular VS React comparison](http://www.ociweb.com/resources/publications/sett/comparison-of-angular-2-and-react)
* [Angular2 with redux](http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/)

#### Projects

* [angular2-playground](https://github.com/SekibOmazic/angular2-playground) has [Live Demo](http://rawgit.com/SekibOmazic/angular2-playground/master/dist/index.html)
* [learn angular2](https://github.com/panacloud/learn-angular2)

- projects to checkout

* [angular-cli] `npm install -g angular-cli@latest` to install
* [ng2Boilerplate](https://github.com/born2net/ng2Boilerplate)

- projects with code samples

* [angular2 universal starter](https://github.com/alexpods/angular2-universal-starter) server rendering 
* [Angular2 JumpStart](https://github.com/DanWahlin/Angular2-JumpStart?platform=hootsuite)
* [angular2 seed](https://github.com/mgechev/angular2-seed)
* [angular2 samples](https://github.com/thelgevold/angular-2-samples)
* [ng2-webpack](https://github.com/ocombe/ng2-webpack.git)

#### Plugins Projects

* [ng2-charts](https://github.com/valor-software/ng2-charts) and [Demo site](http://valor-software.github.io/ng2-charts/)

## Thanks

Special thanks to those projects to inspire angular2-rocks. 

* [Angular2 Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter)


## TODO

1. Add `tsconfig`

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  }
}
```


## License

Copyright (c) 2016 [Matt Ma](http://mattmadesign.com)

Angular2 Rocks is [MIT Licensed](./LICENSE.md).