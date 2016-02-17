var path = require('path');
var rucksack = require('rucksack-css');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
  resolve: {
    cache: false,
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async'), // ensure .async.ts etc also works
    modulesDirectories: ['src', 'node_modules']
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      {
        test: /\.async\.ts$/,
        loaders: [
          'es6-promise-loader',
          'ts-loader'
        ],
        exclude: [
          /\.(spec|e2e)\.ts$/
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          "compilerOptions": {
            "noEmitHelpers": true,
            "removeComments": true,
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/,  loader: 'raw-loader' },
      { test: /\.sass$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      root('zone.js/dist'),
      root('angular2/bundles')
    ]
  },
  stats: { colors: true, reasons: true },
  debug: false,
  plugins: [
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),
    new ProvidePlugin({
      // TypeScript helpers
      '__metadata': 'ts-helper/metadata',
      '__decorate': 'ts-helper/decorate',
      '__awaiter': 'ts-helper/awaiter',
      '__extends': 'ts-helper/extends',
      '__param': 'ts-helper/param',
      'Reflect': 'es7-reflect-metadata/src/global/browser'
    })
  ],

  sassLoader: {
    indentedSyntax: true
  },

  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],

    // we need this due to problems with es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

function prepend(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) { args = [args] }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val
    }));
  }, ['']);
}
