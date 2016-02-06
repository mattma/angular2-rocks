var path = require('path');
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'Angular2 Rocks starter kit',
  baseUrl: '/',
  host: 'localhost',
  port: 4200,
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
  debug: true,
  // cache: false,

  entry: {
    'polyfills': './src/app/polyfills.ts',
    'main': './src/app/main.ts'
  },

  // Config for our build files
  output: {
    path: root('dist'), // This is where images AND js will go
    // This is used to generate URLs to e.g. images
    // publicPath: 'http://mycdn.com/',
    filename: '[name].bundle.js', // Template based on keys in entry above
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async'), // ensure .async.ts etc also works
    modulesDirectories: ['src', 'node_modules']
  },

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [/node_modules/]
    },
    // rewire source map files of libraries, use to debug into 3rd party libraries, currently only debugging on angular2 internal
    {
      test: /\.js$/,
      exclude: [
        root('node_modules/rxjs')
      ],
      loader: 'source-map-loader'
    }],

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
          'ignoreDiagnostics': [
            2300, // 2300 -> Duplicate identifier
            2403, // 2403 -> Subsequent variable declarations
            2420, // 2420 -> Duplicate string index signature
            2503, // 2503 -> incorrectly implements interface
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [/\.(spec|e2e|async)\.ts$/]
      },

      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/, loader: 'raw-loader' },

      // Support for SASS as raw text
      {
        test: /\.sass$/,
        // loader: ExtractTextPlugin.extract('raw!css?sourceMap!postcss!sass?sourceMap!sass-resources')
        exclude: /node_modules/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap', 'sass-resources']
      },

      {test: /\.(woff2?|ttf|eot|svg|ico)$/, loader: 'url?limit=10000'},
      // {test: /\.(png|jpe?g|gif)$/, loader: 'file?name=[path][name].[ext]?[hash]'},
      // { test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules|bower_components)/, loader: 'url?limit=1000&name=images/[hash].[ext]' }
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?mimetype=image/[ext]'},

      // support for .html as raw text
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  sassResources: [
    // root('src/assets/styles/_reset.sass')
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src/app'
  },

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

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    //new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.bundle.js',
      minChunks: Infinity
    }),

    // static assets
    new CopyWebpackPlugin(
      [{
        from: 'src/assets', to: 'assets'
      }]
    ),

    // generating html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),

    // definePlugin takes raw strings and inserts them
    // so you can put strings of JS if you want.
    // In your code, refer to magic globals:
    /*
      if (ENV) {
        console.warn('Extra logging');
      }
     */
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ],

  // our Webpack Development Server config
  devServer: {
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
