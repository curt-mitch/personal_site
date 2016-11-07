const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './public/main.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  watch: true,
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }
  ],
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
