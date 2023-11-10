const path = require('path');

module.exports = {
  entry: './server.js', // Specify your server entry file.
  output: {
    path: path.resolve(__dirname, '../build'), // Output directory for the server bundle.
    filename: 'server-bundle.js', // Output server bundle filename.
  },
  target: 'node', // Target Node.js environment.
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpilation.
        },
      },
    ],
  },
};