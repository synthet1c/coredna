module.exports = {
  context: __dirname,
  entry: './source/js/app.js',
  output: {
    path: './dist',
    filename: 'app.bundle.js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ['transform-decorators-legacy'],
          cacheDirectory: '.webpackcache'
        }
      },
    ]
  }
};
