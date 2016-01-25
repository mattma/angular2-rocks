var path = require('path');
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
    extensions: ['','.ts','.js','.json','.css','.html', '.sass']
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          /node_modules\/rxjs/
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          "configFileName": "tsconfig.test.json",
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [/\.e2e\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/,  loader: 'raw-loader' },
      { test: /\.sass$/, loaders: ['style', 'css', 'sass'/*, 'sass-resources'*/] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' }
    ],
    // sassResources: [
    //   root('src/assets/styles/__init.sass')
    // ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.e2e\.ts$/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      /zone\.js\/dist\/.+/,
      /angular2\/bundles\/.+/
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
      },
      'global': 'window',
      // TypeScript helpers
      '__metadata': 'Reflect.metadata',
      '__decorate': 'Reflect.decorate'
    }),
    new ProvidePlugin({
      // '__metadata': 'ts-helper/metadata',
      // '__decorate': 'ts-helper/decorate',
      '__awaiter': 'ts-helper/awaiter',
      '__extends': 'ts-helper/extends',
      '__param': 'ts-helper/param',
      'Reflect': 'es7-reflect-metadata/dist/browser'
    })
  ],

  sassLoader: {
    indentedSyntax: true
  },

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
