const path = require('path');

module.exports = {
  entry: './src/client.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
  // resolve: {
  //   alias: {
  //     Style: path.resolve(__dirname, 'public/style/')
  //   }
  // }
};
