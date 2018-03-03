const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const debug = require('debug')('app:config:webpack')

debug('Creating configuration.')
const webpackConfig = {
  cache: true,
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-source-map',
  resolve: {
    unsafeCache: true,
    modules: [resolve('..'), resolve('./src'), resolve('./node_modules')],
    extensions: ['.js'],
  },
  module: {},
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = './src/index.js'

webpackConfig.entry = []

webpackConfig.entry.push('babel-polyfill', APP_ENTRY)

if (process.env === 'development') {
  webpackConfig.entry.push(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  )
}

webpackConfig.devServer =
  process.env === 'development'
    ? {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'dist'),
        // match the output path

        publicPath: '/',
        compress: false,
        port: '8080',
        historyApiFallback: true,
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            logLevel: 'debug',
          },
        },
        // match the output `publicPath`
      }
    : {}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].[hash].js',
  path: resolve(__dirname, 'dist'),
  publicPath: '/',
}

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {}
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true
webpackConfig.externals['react/lib/ReactContext'] = true
webpackConfig.externals['react/addons'] = true

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
]

debug('Enabling plugins for live development (HMR, NoErrors).')
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin())

// ------------------------------------
// Rules
// ------------------------------------
// JavaScript
//

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: true,
      },
    },
    include: './src',
  },
]

// ------------------------------------
// Styles
// ------------------------------------

webpackConfig.module.rules.push({
  test: /\.s?css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
})

// File rules
/* eslint-disable */
webpackConfig.module.rules.push(
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix: 'fonts/&name=[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix: 'fonts/&name=[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2',
        },
      },
    ],
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          prefix: 'fonts/&name=[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/opentype',
        },
      },
    ],
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix: 'fonts/&name=[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
    ],
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          prefix: 'fonts/&name=[path][name].[ext]',
        },
      },
    ],
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  }
)
/* eslint-enable */

module.exports = webpackConfig
