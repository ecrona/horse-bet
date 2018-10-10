import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

export const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.sass', '.scss']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.svg?$/,
        loaders: ['file-loader']
      },
      {
        test: /\.sass?|.scss?|.css?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './public/index.html'
    })
  ],

  devtool: 'source-map'
}

export default config
