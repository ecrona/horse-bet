import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve('./src/client'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './src/client/tsconfig.json' })
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './src/client/tsconfig.json'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.svg?$/,
        loaders: ['file-loader']
      }
    ]
  }
}

export default config
