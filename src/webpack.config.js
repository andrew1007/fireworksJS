// @ts-check
/**
 * @typedef {import('webpack').Configuration} Configuration
 */

/**
 * @type {Configuration}
 */
module.exports = {
  entry: './src/entry.ts',
  output: {
    publicPath: './',
    filename: 'fireworks.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts'],
    modules: ['../src', '../node_modules'],
  }
};
