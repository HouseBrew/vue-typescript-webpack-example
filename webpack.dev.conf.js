path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin')
merge = require('webpack-merge')
commonConfig = require('./webpack.common.conf')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: "inline-source-map",
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true,
    excludeModules: false
  },
  serve: { //object
    port: 8080,
    content: path.resolve(__dirname, "dist")
  }
})
