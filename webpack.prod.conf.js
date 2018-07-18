// path = require('path')
// HtmlWebpackPlugin = require('html-webpack-plugin')
merge = require('webpack-merge')
commonConfig = require('./webpack.common.conf')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: false
})
