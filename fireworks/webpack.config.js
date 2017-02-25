module.exports = {
  entry: './launch.js',
  output: {
    path: './',
    filename: 'fireworks.js',
  },
  module  :  {
    loaders  :  [
      {
        test    :  /\.js$/,
        loader  :  'babel',
        exclude :  /node_modules/,
        options :  {
          presets  :  [ 'es2015', 'stage-2' ] // stage-2 if required
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  }
};
