const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
  mode: 'none',
  target: 'web',
  entry: {
    app: path.join(__dirname, 'src', 'core', 'init.tsx')
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        // target: 'http://185.20.226.121:8082',
        secure: false
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    //хак для Globalize
    alias: {
      'cldr$': 'cldrjs',
      'cldr': 'cldrjs/dist/cldr'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: "ts-loader",
          options: {
            allowTsInNodeModules: true
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      }
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/'
  },
  optimization: {
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'core', 'index.html'),
    }),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new CopyPlugin({ patterns: [{ from: "public", to: "public" }] })
  ]
});
