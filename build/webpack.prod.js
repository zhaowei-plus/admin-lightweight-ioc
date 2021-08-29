const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const common = require('./webpack.base')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].js',
  },
  performance: {
    hints: false,
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      minSize: 50 * 1024,
      maxSize: 1024 * 1024,
      cacheGroups: {
        npm: {
          name: 'modules',
          test: /[/\\]node_modules[/\\]/,
          priority: 5,
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '轻量化IOC',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  ],
})
