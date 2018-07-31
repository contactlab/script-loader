const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    loader: path.resolve(__dirname, './src/loader.js'),
    'loader.min': path.resolve(__dirname, './src/loader.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        uglifyOptions: {
          ie8: true,
          safari10: true
        }
      })
    ]
  }
};
