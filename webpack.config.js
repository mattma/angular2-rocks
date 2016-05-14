var rucksack = require('rucksack-css');
var webpack = require('webpack');
var helpers = require('./webpack.helpers');

// Webpack Plugins
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'),
  CopyWebpackPlugin.default || CopyWebpackPlugin);
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

// Possible values: development, production, test
var ENV = process.env.NODE_ENV || process.env.ENV || 'development';
var HOST = process.env.HOST;
var PORT = process.env.PORT;
var HMR = helpers.hasProcessFlag('hot');

// Setup default HOST and PORT
switch(ENV) {
  case 'development':
    HOST = 'localhost';
    PORT = 4200;
    break;

  case 'production':
    HOST = 'localhost';
    PORT = 4600;
    HMR = false; // in production, HMR is disabled
    break;
}

var metadata = {
  title: 'Angular2 Rocks starter kit',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
};

/*
 * Config
 */
var webpackConfig = {
  // static data for index.html
  metadata: metadata,
  // devtool: 'eval' // for faster builds use 'eval'
  // devtool: 'source-map',

  entry: {
    'polyfills': './src/app/polyfills.ts',
    'vendor': './src/app/vendor.ts',
    'main': './src/app/main.browser.ts'
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src/app'),
    modulesDirectories: ['node_modules'], // remove other default values
    alias: {
      'angular2/core': helpers.root('node_modules/@angular/core/index.js'),
      'angular2/testing': helpers.root('node_modules/@angular/core/testing.js'),
      '@angular/testing': helpers.root('node_modules/@angular/core/testing.js'),
      'angular2/platform/browser': helpers.root('node_modules/@angular/platform-browser/index.js'),
      'angular2/router': helpers.root('node_modules/@angular/router-deprecated/index.js'),
      'angular2/http': helpers.root('node_modules/@angular/http/index.js'),
      'angular2/http/testing': helpers.root('node_modules/@angular/http/testing.js')
    }
  },

  module: {
    preLoaders: [
      // rewire source map files of libraries, use to debug into 3rd party libraries, currently
      // only debugging on angular2 internal
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular2-material'),
          helpers.root('node_modules/@angular'),
        ]
      }
    ],

    loaders: [
      // Support for .ts and Angular 2 async routes via .async.ts
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [
          /\.(spec|e2e)\.ts$/
        ]
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw-loader'},

      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},
      // {test: /\.(png|jpe?g|gif)$/, loader: 'file?name=[path][name].[ext]?[hash]'},
      // { test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules|bower_components)/, loader:
      // 'url?limit=1000&name=images/[hash].[ext]' }
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw',
        exclude: [
          helpers.root('src/index.html')
        ]
      }
    ]
  },

  plugins: [
    // Do type checking in a separate process, so webpack don't need to wait.
    new ForkCheckerPlugin(),

    // Varies the distribution of the ids to get the smallest id length
    new OccurenceOrderPlugin(true),

    // Shares common code between the pages. It identifies common modules
    // and put them into a commons chunk.
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
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
      template: 'src/index.html',
      chunksSortMode: 'dependency'
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
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR,
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
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
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

// development specific logic
if (ENV === 'development') {
  webpackConfig.debug = true;
  webpackConfig.devtool = 'cheap-module-eval-source-map';
  // webpackConfig.cache = false;

  // Config for our build files
  webpackConfig.output = {
    path: helpers.root('dist'), // This is where images AND js will go
    // This is used to generate URLs to e.g. images
    // publicPath: 'http://mycdn.com/',
    filename: '[name].bundle.js', // Template based on keys in entry above
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  };

  var devLoaders = [
    // Support for SASS as raw text
    {
      test: /\.sass$/,
      // loader: ExtractTextPlugin.extract('raw!css?sourceMap!postcss!sass?sourceMap')
      loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
      exclude: [
        helpers.root('node_modules')
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

  // our Webpack Development Server config
  webpackConfig.devServer = {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/app',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  };

  webpackConfig.node.crypto = 'empty';
  webpackConfig.node.process = true;
}

// production specific logic
if (ENV === 'production') {
  var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
  var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
  var CompressionPlugin = require('compression-webpack-plugin');
  var WebpackMd5Hash = require('webpack-md5-hash');

  webpackConfig.debug = false;
  webpackConfig.cache = false;
  webpackConfig.devtool = 'source-map';

  // Config for our build files
  webpackConfig.output = {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  };

  var prodPreLoaders = [
    {
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [
        helpers.root('node_modules')
      ]
    }
  ];
  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(prodPreLoaders);

  var prodLoaders = [
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
    failOnHint: true,
    resourcePath: 'src/app'
  };

  webpackConfig.htmlLoader = {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  };

  var prodPlugins = [
    // Plugin to replace a standard webpack chunkhash with md5.
    new WebpackMd5Hash(),

    // Prevents the inclusion of duplicate code into your bundle
    // and instead applies a copy of the function at runtime.
    new DedupePlugin(),

    // Plugin: UglifyJsPlugin
    // Description: Minimize all JavaScript output of chunks.
    // Loaders are switched into minimizing mode.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug

      beautify: false, //prod

      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      }, //prod

      compress: {
        screw_ie8: true
      }, //prod

      comments: false //prod
    }),

    // Description: Prepares compressed versions of assets to serve
    // them with Content-Encoding
    //
    // See: https://github.com/webpack/compression-webpack-plugin
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ];
  webpackConfig.plugins = webpackConfig.plugins.concat(prodPlugins);

  webpackConfig.node.process = false;
}

// test specific logic
if (ENV === 'test') {
  webpackConfig.debug = false;
  webpackConfig.devtool = 'inline-source-map';

  webpackConfig.resolve = {
    // ensure loader extensions match
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src/app')
  };

  var testPreLoaders = [
    {
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [
        helpers.root('node_modules')
      ]
    },
    // Source map loader support for *.js files
    // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
    {
      test: /\.js$/,
      loader: 'source-map-loader',
      exclude: [
        // these packages have problems with their sourcemaps
        helpers.root('node_modules/rxjs'),
        helpers.root('node_modules/@angular2-material'),
        helpers.root('node_modules/@angular')
      ]
    }
  ];
  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(testPreLoaders);

  webpackConfig.module.loaders = [
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      query: {
        // remove TypeScript helpers to be injected below by DefinePlugin
        compilerOptions: {
          removeComments: true
        }
      },
      exclude: [/\.e2e\.ts$/]
    },
    {test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('src/index.html')]},
    {test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')]},
    {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000', exclude: [helpers.root('src/index.html')]},
    {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]', exclude: [helpers.root('src/index.html')]},
    {test: /\.sass$/, loaders: ['style', 'css', 'postcss', 'sass'], exclude: [helpers.root('src/index.html')]},
    {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')]}
  ];

  webpackConfig.module.postLoaders = [
    // instrument only testing sources with Istanbul
    {
      test: /\.(js|ts)$/,
      include: helpers.root('src'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [
        /\.(e2e|spec)\.ts$/,
        /node_modules/
      ]
    }
  ];

  webpackConfig.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src/app'
  };

  // This will rewrite the entire plugins array with test specific
  webpackConfig.plugins = [
    new DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR,
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    })
  ];

  webpackConfig.node.process = false;
}

module.exports = webpackConfig;
