const paths = require('../paths')

const babelLoader = {
  test: /\.(js|jsx|mjs)$/,
  include: paths.src,
  loader: 'babel-loader'
}

const ASSET_PATH = process.env.NODE_ENV === 'production' ? `${paths.cdn}/build` : paths.publicPath

const urlLoaderFileTypes = /\.(png|jpe?g|gif|svg|ttf|otf|eot|woff|woff2)$/

const urlLoaderConfig = (emitFile) => ({
  loader: require.resolve('url-loader'),
  options: {
    limit: 1,
    name: 'assets/[name].[hash:8].[ext]',
    publicPath: ASSET_PATH,
    emitFile
  }
})

const imageLoaderConfig = {
  loader: 'image-webpack-loader',
  options: {
    disable: process.env.NODE_ENV === 'development',
    pngquant: {
      quality: '65-100',
      speed: 4
    }
  }
}

const urlLoaderClient = {
  test: urlLoaderFileTypes,
  use: [urlLoaderConfig(true)]
}

const urlLoaderServer = {
  test: urlLoaderFileTypes,
  use: [urlLoaderConfig(false)]
}

const cssLoaderClient = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
const cssLoaderServer = {
  test: /\.css$/,
  use: ['css-loader']
}

const fileLoaderClient = {
  exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]'
      }
    },
    imageLoaderConfig
  ]
}

const fileLoaderServer = {
  exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false
      }
    },
    imageLoaderConfig
  ]
}

const eslintLoader = {
  test: /\.(js|jsx)?$/,
  enforce: 'pre',
  include: paths.src,
  use: [
    { loader: 'babel-loader' },
    { loader: 'eslint-loader',
      options: {
        emitWarning: true,
        formatter: require('eslint/lib/cli-engine/formatters/stylish')
        // fix: true
      }
    }
  ]
}

const mdxLoader = {
  test: /\.mdx?$/,
  include: paths.src,
  exclude: [/\.stories\./],
  use: [
    'babel-loader',
    '@mdx-js/loader'
  ]
}

const client = [{
  oneOf: [
    eslintLoader,
    mdxLoader,
    babelLoader,
    urlLoaderClient,
    cssLoaderClient,
    fileLoaderClient
  ]
}]

const server = [{
  oneOf: [
    mdxLoader,
    eslintLoader,
    babelLoader,
    urlLoaderServer,
    cssLoaderServer,
    fileLoaderServer
  ]
}]

module.exports = {
  client,
  server
}
