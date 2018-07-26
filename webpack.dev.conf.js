const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.conf')
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const cypressWebpackPlugin = require('cypress-webpack-plugin')
const cypress = require('cypress')
const resolve = (rel) => path.resolve(__dirname, rel)

class CypressTDDPlugin extends cypressWebpackPlugin.TestDrivenDevPlugin {
  test(specs) {
    // console.log(this.options)
    let specString = [...specs].join(',')
    if (!specString) {
      specString = `**/${this.options.matchSpecs}`
    }
    cypress.run({
      reporter: 'min',
      config: {
        baseUrl: this.options.baseUrl,
        chromeWebSecurity: false,
        video: false,
        modifyObstructiveCode: false
      },
      spec: specString
    })
  }
}

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: "inline-source-map",
  serve: { //object
    port: 8080,    
    // https://github.com/webpack-contrib/webpack-serve
    // proxy + history fallback
    add: (app, middleware, options) => {
      app.use(convert(proxy('/api', { target: 'http://localhost:8081' })));
      app.use(convert(history()));
    }
  },
  // exposing vue instance for the sake of cypress unit test
  output: {
    library: 'app',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  plugins: [
    new CypressTDDPlugin({
      base: resolve('./'),
      baseUrl: 'http://localhost:8080',
      testFolder: 'test',
      matchSpecs: '*.spec.js'
    })
  ]
})
