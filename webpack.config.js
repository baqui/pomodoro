const path = require('path');
const nodeExternals = require('webpack-node-externals');

const PATHS = {
  build: path.join(__dirname, 'dist')
};

module.exports = {
  target: "node",
  entry: {
    'index': ['./index']
  },
  output: {
    path: PATHS.build
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=18000&name=[name].[ext]'
    }
    ]
  },
  externals: [nodeExternals()],
};



