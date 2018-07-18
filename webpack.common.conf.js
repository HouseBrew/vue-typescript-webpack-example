const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = (rel) => path.resolve(__dirname, rel)

module.exports = {
  entry: './src/main.ts',
  output: {
    // path: path.resolve(__dirname, "dist"),
    filename: 'app.js'
  },
  devtool: false,
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              cssSourceMap: false,
              cacheBusting: true,
              transformToRequire: {
                video: 'src',
                source: 'src',
                img: 'src',
                image: 'xlink:href'
              }
            }
            
          }
        ]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: resolve("tslint.json"),
              tsConfigFile: resolve("tsconfig.json")
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: resolve("tsconfig.json"),
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        include: ["./src"],
        use: {
          loader: "babel-loader",
          options: { /* ... */ }
        }
      },
      {
        test: /\.css$/,
        include: ["./src"],
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        // include: ["./src"],
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      'title': 'title',
      'filename': 'index.html',
      'template': 'index.html',
      'templateParameters': true, //	{Boolean|Object|Function}	``	Allows to overwrite the parameters used in the template
      'inject': 'body', //	{Boolean|String}	true	true || 'head' || 'body' || false Inject all assets into the given template or templateContent. When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element
      'favicon': '',
      // meta	{Object}	{}	Allows to inject meta-tags. E.g. meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
      'minify': true, //	{Boolean|Object}	false	Pass html-minifier's options as object to minify the output
      // hash	{Boolean}	false	If true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting
      'cache': true //	{Boolean}	true	Emit the file only if it was changed
      // showErrors	{Boolean}	true	Errors details will be written into the HTML page
      // chunks	{?}	?	Allows you to add only some chunks (e.g only the unit-test chunk)
      // chunksSortMode	{String|Function}	auto	Allows to control how chunks should be sorted before they are included to the HTML. Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      // excludeChunks	{Array.<string>}	``	Allows you to skip some chunks (e.g don't add the unit-test chunk)
      // xhtml	{Boolean}	false	If true render the link tags as self-closing (XHTML compliant)
    }),

    new VueLoaderPlugin()  // responsible for clone all rules other than .vue to apply them to corresponding language block

  ],
  resolve: {
    extensions: [".ts", ".js", ".css", ".json", ".vue", ".stylus", ".styl"],
    alias: {
      "@": resolve('src'),
      "vue": 'vue/dist/vue.js'
    }
  }
}
