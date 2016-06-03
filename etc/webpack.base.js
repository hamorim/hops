
var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var HopsPlugin = require('../plugin');

module.exports = new WebpackConfig().merge({
  filename: __filename,
  entry: require.resolve('../shims/browser'),
  output: {
    path: config.distDir,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=[path][name]-[local]-[hash:base64:5]&importLoaders=1',
        'postcss'
      ]
    }, {
      test: /\.((html)|(svg)|(jpeg))$/,
      loader: 'file'
    }, {
      test: /\.((png)|(gif))$/,
      loader: 'url?limit=100000'
    }]
  },
  postcss: [
    require('postcss-cssnext')
  ],
  resolve: {
    alias: {
      'hops-main': config.appRoot
    }
  },
  plugins: [
    new HopsPlugin({
      entry: require.resolve('../shims/node'),
      main: config.appRoot
    })
  ]
});
