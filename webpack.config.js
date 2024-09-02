// webpack.config.js
const path = require('path');

module.exports = {
  entry: './dist/app.js',                // Entry point is the compiled TypeScript main file
  output: {
    filename: 'bundle.js',               // Output file name
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'],          // Resolve both TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development'                    // Mode can be 'development' or 'production'
};
