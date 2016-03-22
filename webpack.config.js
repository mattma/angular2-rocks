var rucksack = require('rucksack-css');
var webpack = require('webpack');
var helpers = require('./webpack.helpers');

// Webpack Plugins
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// var ProvidePlugin = require('webpack/lib/ProvidePlugin');
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
    'main': './src/app/main.browser.ts',
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },

  module: {
    preLoaders: [
      // rewire source map files of libraries, use to debug into 3rd party libraries, currently
      // only debugging on angular2 internal
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular2-material')
        ]
      }
    ],

    loaders: [
      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('node_modules')]},

      // Support for CSS as raw text
      { test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('node_modules')]},

      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},
      // {test: /\.(png|jpe?g|gif)$/, loader: 'file?name=[path][name].[ext]?[hash]'},
      // { test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules|bower_components)/, loader:
      // 'url?limit=1000&name=images/[hash].[ext]' }
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw',
        exclude: [
          helpers.root('src/index.html'),
          helpers.root('node_modules')
        ]
      }
    ]
  },

  plugins: [
    new OccurenceOrderPlugin(true),

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
      chunksSortMode: 'none'
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
      'HMR': HMR
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
    progress: true,
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
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: [
        /\.(spec|e2e)\.ts$/,
        helpers.root('node_modules')
      ]
    },
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

  var devPlugins = [
    // Do type checking in a separate process, so webpack don't need to wait.
    new ForkCheckerPlugin(),
    new CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),
  ];
  webpackConfig.plugins = webpackConfig.plugins.concat(devPlugins);

  // our Webpack Development Server config
  webpackConfig.devServer = {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/app',
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
  webpackConfig.cache = false;
  webpackConfig.devtool = 'source-map';

  // Config for our build files
  webpackConfig.output = {
    path: helpers.root('dist'),
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
        helpers.root('node_modules')
      ]
    }
  ];
  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(prodPreLoaders);

  var prodLoaders = [
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      query: {
        // remove TypeScript helpers to be injected below by DefinePlugin
        'compilerOptions': {
          'removeComments': true
        }
      },
      exclude: [
        /\.(spec|e2e)\.ts$/,
        helpers.root('node_modules')
      ]
    },
    // Support for SASS as raw text
    {
      test: /\.sass$/,
      loaders: ['style', 'css', 'postcss', 'sass']
      // loader: ExtractTextPlugin.extract('css!postcss!sass')
    }
  ];
  webpackConfig.module.loaders = webpackConfig.module.loaders.concat(prodLoaders);

  webpackConfig.module.noParse = [
    helpers.root('zone.js', 'dist'),
    helpers.root('angular2', 'bundles')
  ];

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
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  };

  var prodPlugins = [
    new ForkCheckerPlugin(),
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.[chunkhash].bundle.js',
      chunks: Infinity
    }),

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

      beautify: false,//prod

      // mangle: { screw_ie8 : true }, //prod
      mangle: {
        screw_ie8: true,
        except: [
          'App',
          'About',
          'Contact',
          'Home',
          'Menu',
          'Footer',
          'XLarge',
          'RouterActive',
          'RouterLink',
          'RouterOutlet',
          'NgFor',
          'NgIf',
          'NgClass',
          'NgSwitch',
          'NgStyle',
          'NgSwitchDefault',
          'NgControl',
          'NgControlName',
          'NgControlGroup',
          'NgFormControl',
          'NgModel',
          'NgFormModel',
          'NgForm',
          'NgSelectOption',
          'DefaultValueAccessor',
          'NumberValueAccessor',
          'CheckboxControlValueAccessor',
          'SelectControlValueAccessor',
          'RadioControlValueAccessor',
          'NgControlStatus',
          'RequiredValidator',
          'MinLengthValidator',
          'MaxLengthValidator',
          'PatternValidator',
          'AsyncPipe',
          'DatePipe',
          'JsonPipe',
          'NumberPipe',
          'DecimalPipe',
          'PercentPipe',
          'CurrencyPipe',
          'LowerCasePipe',
          'UpperCasePipe',
          'SlicePipe',
          'ReplacePipe',
          'I18nPluralPipe',
          'I18nSelectPipe'
        ] // Needed for uglify RouterLink problem
      }, // prod
      compress: {screw_ie8: true}, //prod
      comments: false //prod
    }),

    // include uglify in production
    new CompressionPlugin({
      algorithm: helpers.gzipMaxLevel,
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
  webpackConfig.devtool = 'source-map';

  var testPreLoaders = [
    {
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [
        helpers.root('node_modules')
      ]
    }
  ];
  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(testPreLoaders);

  var testLoaders = [
    // Support for .ts files.
    {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      query: {
        // remove TypeScript helpers to be injected below by DefinePlugin
        'compilerOptions': {
          'removeComments': true
        }
      },
      exclude: [/\.e2e\.ts$/]
    },
    // Support for SASS as raw text
    {
      test: /\.sass$/,
      loaders: ['style', 'css', 'postcss', 'sass']
      // loader: ExtractTextPlugin.extract('css!postcss!sass')
    }
  ];
  webpackConfig.module.loaders = webpackConfig.module.loaders.concat(testLoaders);

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

  webpackConfig.module.stats = { colors: true, reasons: true };

  webpackConfig.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src/app'
  };

  // This will rewrite the entire plugins array with test specific
  webpackConfig.plugins = [
    new DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR
    })
  ];

  webpackConfig.node.process = false;
}

module.exports = webpackConfig;
