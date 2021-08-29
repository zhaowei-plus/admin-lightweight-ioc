const merge = require('webpack-merge')
const common = require('./webpack.base')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    disableHostCheck: true,
    progress: true,
    stats: 'errors-only',
    host: 'local.baas.uban360.net',
    proxy: {
      '/web-sso': 'http://baas.uban360.net:21006',
      '/baas-login': 'http://baas.uban360.net:21006',
      '/baas-admin': 'http://baas.uban360.net:21006',
      '/baas-account': 'http://baas.uban360.net:21006',
      '/baas-search': 'http://baas.uban360.net:21006',
      '/baas-permission': 'http://baas.uban360.net:21006',
      '/baas-grade': 'http://baas.uban360.net:21006',
      '/baas-index': 'http://baas.uban360.net:21006',
      '/smallapp': 'http://baas.uban360.net:21006',
      '/baas-app': 'http://baas.uban360.net:21006',
      '/sfs': 'http://baas.uban360.net:21006',
      '/GET': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/190',
        changeOrigin: true,
      },
      '/POST': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/190',
        changeOrigin: true,
      },
      '/mock': {
        target: 'http://10.0.17.202:3000',
        changeOrigin: true,
      },
    },
  },
})
