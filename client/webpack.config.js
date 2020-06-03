const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf = {
  entry: [
    './src/index.js',
    './src/index.scss'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true,
    port: 8000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
            // presets: ['env', 'stage-0', 'react']
          }
        }
        // exclude: '/node_modules/'                      исключение 
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css')
  ]
};

module.exports = (env, options) => {
  const production = options.mode === 'production';

  conf.devtool = production
    ? false
    : "eval-sourcemap"

  return conf;
}
