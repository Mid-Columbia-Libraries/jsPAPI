var path    = require('path'),
    Html    = require('html-webpack-plugin'),
    Clean   = require('clean-webpack-plugin'),
    Uglify  = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    "bundle": "./index.js",
    "bundle.min": "./index.js",
  },
  devtool: 'source-map',
  plugins: [
    new Clean(['dist']),
    new Html({ title: 'API Test Tool' }),
    new Uglify({
      include: /\.min\.js$/,
    })
  ],
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
	  publicPath: '/'
  }
};