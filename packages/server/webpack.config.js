const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const inProduction = process.env.NODE_ENV === 'production'
const inDevelopment = process.env.NODE_ENV === 'development'

const plugins = []
if (inDevelopment) {
  plugins.push(new NodemonPlugin())
}

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  node: {
    __dirname: false,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.gql', '.graphql'],
  },
  // Workaround for ws module trying to require devDependencies
  externals: ['utf-8-validate', 'bufferutil'],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true,
          cacheDirectory: true,
          cacheCompression: inProduction,
          compact: inProduction,
        },
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins,
}
