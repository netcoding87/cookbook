const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(new NodemonPlugin())
}

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.gql', '.graphql'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    library: 'Server',
  },
  // Workaround for ws module trying to require devDependencies
  externals: ['utf-8-validate', 'bufferutil'],
  plugins,
}
