module.exports = {
  entry: __dirname + '/src/js/app.js',
  output: {
    filename: __dirname + '/src/js/app-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        loaders: ['style','css','autoprefixer']
      }
    ]
  },
  devtool: 'sourcemap'
}
