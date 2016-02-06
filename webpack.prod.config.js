var path = require('path');
var zlib = require('zlib');
// Webpack Plugins
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 4600;

var metadata = {
  title: 'Angular2 Rocks starter kit',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: false,

  entry: {
    'polyfills': './src/app/polyfills.ts',
    'main': './src/app/main.ts'
  },

  // Config for our build files
  output: {
    path: root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  resolve: {
    cache: false,
    // ensure loader extensions match
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async'), // ensure .async.ts etc also works
    modulesDirectories: ['src', 'node_modules']
  },

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
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true,
            'noEmitHelpers': true,
          },
          'ignoreDiagnostics': [
            2300, // 2300 -> Duplicate identifier
            2403, // 2403 -> Subsequent variable declarations
            2420, // 2420 -> Duplicate string index signature
            2503, // 2503 -> incorrectly implements interface
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.(spec|e2e|async)\.ts$/ ]
      },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // Support for SASS as raw text
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'postcss', 'sass']
        // loader: ExtractTextPlugin.extract('css!postcss!sass')
      },

      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},

      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader' }
    ]
  },

  plugins: [
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new OccurenceOrderPlugin(true),
    // new ExtractTextPlugin('[name].[chunkhash].bundle.css'),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.[chunkhash].bundle.js',
      chunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // generating html
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
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
    }),
    new UglifyJsPlugin({
      // to debug prod builds uncomment //debug lines and comment //prod lines

      // beautify: true,//debug
      // mangle: false,//debug
      // dead_code: false,//debug
      // unused: false,//debug
      // deadCode: false,//debug
      // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
      // comments: true,//debug

      beautify: false, // prod
      // disable mangling because of a bug in angular2 beta.1, beta.2, and beta.3
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },//prod
      mangle: false,
      compress : { screw_ie8 : true}, // prod
      comments: false
    }),
    // include uglify in production
    new CompressionPlugin({
      algorithm: gzipMaxLevel,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ],
  // Other module loader config
  tslint: {
    emitErrors: true,
    failOnHint: true
  },

  sassLoader: {
    indentedSyntax: true
  },

  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],

  // don't use devServer for production

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

function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback)
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
