module.exports = {
  entry: './public/main.js',
  output: {
    filename: './public/bundle.js'
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
    }
  ]
}
