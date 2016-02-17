var path = require('path');
var zlib = require('zlib');

var rucksack = require('rucksack-css');
var webpack = require('webpack');

// Webpack Plugins
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

// Possible values: development, production, test
var ENV = process.env.NODE_ENV || process.env.ENV || 'development';
var HOST = process.env.HOST;
var PORT = process.env.PORT;

// Setup default HOST and PORT
switch(ENV) {
  case 'development':
    HOST = 'localhost';
    PORT = 4200;
    break;

  case 'production':
    HOST = 'localhost';
    PORT = 4600;
    break;
}

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
var webpackConfig = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',

  entry: {
    'polyfills': './src/app/polyfills.ts',
    'main': './src/app/main.ts'
  },

  resolve: {
    // ensure loader extensions match
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async'), // ensure .async.ts etc also works
    modulesDirectories: ['src', 'node_modules']
  },

  module: {
    preLoaders: [
      // rewire source map files of libraries, use to debug into 3rd party libraries, currently only debugging on angular2 internal
      {
        test: /\.js$/,
        loader: 'source-map-loader',
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

      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/, loader: 'raw-loader' },

      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},
      // {test: /\.(png|jpe?g|gif)$/, loader: 'file?name=[path][name].[ext]?[hash]'},
      // { test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules|bower_components)/, loader: 'url?limit=1000&name=images/[hash].[ext]' }
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw', exclude: [root('src/index.html')]}
    ]
  },

  plugins: [
    new OccurenceOrderPlugin(true),
    //new ExtractTextPlugin('[name].css'),

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

    // definePlugin takes raw strings and inserts them
    // so you can put strings of JS if you want.
    // In your code, refer to magic globals:
    /*
      if (ENV) {
        console.warn('Extra logging');
      }
     */
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ],

  // https://github.com/jtangelder/sass-loader
  sassLoader: {
    indentedSyntax: true
    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
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

// development specific logic
if (ENV === 'development') {
  webpackConfig.debug = true;
  // webpackConfig.cache = false;

  // Config for our build files
  webpackConfig.output = {
    path: root('dist'), // This is where images AND js will go
    // This is used to generate URLs to e.g. images
    // publicPath: 'http://mycdn.com/',
    filename: '[name].bundle.js', // Template based on keys in entry above
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  };

  var devLoaders = [
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: [/\.(spec|e2e|async)\.ts$/]
    },
    // Support for SASS as raw text
    {
      test: /\.sass$/,
      // loader: ExtractTextPlugin.extract('raw!css?sourceMap!postcss!sass?sourceMap')
      loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
      exclude: [
        root('node_modules')
      ]
    }
  ];
  webpackConfig.module.loaders = webpackConfig.module.loaders.concat(devLoaders);

  // Other module loader config
  webpackConfig.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src/app'
  };

  var devPlugins = [
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.bundle.js',
      minChunks: Infinity
    }),
  ];
  webpackConfig.plugins = webpackConfig.plugins.concat(devPlugins);

  // our Webpack Development Server config
  webpackConfig.devServer = {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    // hot: true,
    // inline: true,
    // progress: true,

    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };
}

// production specific logic
if (ENV === 'production') {
  var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
  var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
  var CompressionPlugin = require('compression-webpack-plugin');
  var WebpackMd5Hash = require('webpack-md5-hash');

  webpackConfig.debug = false;

  // Config for our build files
  webpackConfig.output = {
    path: root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  };

  webpackConfig.resolve.cache = false;

  var prodPreLoaders = [
    {
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [
        root('node_modules')
      ]
    }
  ];
  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(prodPreLoaders);

  var prodLoaders = [
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'ts-loader',
      query: {
        // remove TypeScript helpers to be injected below by DefinePlugin
        'compilerOptions': {
          'removeComments': true,
          'noEmitHelpers': true,
        }
      },
      exclude: [ /\.(spec|e2e|async)\.ts$/ ]
    },
    // Support for SASS as raw text
    {
      test: /\.sass$/,
      loaders: ['style', 'css', 'postcss', 'sass']
      // loader: ExtractTextPlugin.extract('css!postcss!sass')
    }
  ];
  webpackConfig.module.loaders = webpackConfig.module.loaders.concat(prodLoaders);

  // Other module loader config
  webpackConfig.tslint = {
    emitErrors: true,
    failOnHint: true
  };

  var prodPlugins = [
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.[chunkhash].bundle.js',
      chunks: Infinity
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
  ];
  webpackConfig.plugins = webpackConfig.plugins.concat(prodPlugins);
}

// test specific logic
if (ENV === 'test') {

}

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
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

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback)
}

module.exports = webpackConfig;
