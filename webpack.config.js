const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
  mode: 'none',
  target: 'web',
  entry: {
    app: path.join(__dirname, 'src', 'core', 'init.tsx')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
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
      }
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  optimization: {
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
    new webpack.ProvidePlugin({ process: 'process/browser' })
  ]
});
