import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve('./src/client'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.sass', '.scss'],
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
      },
      {
        test: /\.sass?|.scss?|.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  devtool: 'source-map'
}

export default config
