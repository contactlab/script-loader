const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/loader.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'loader.js'
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
  }
};
