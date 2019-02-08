import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/',
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
        test: /\.js$/,
        // include: /(node_modules\/(@webcomponents\/shadycss|lit-html|lit-element)\/).*/,
        loader: 'babel-loader',
        include: /node_modules(?:\/|\\)lit-element|lit-html/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  ie: 11
                }
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          configFileName: './src/client/tsconfig.json'
        }
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
    }),

    new CopyWebpackPlugin([
      {
        from: './src/client/assets',
        to: './assets'
      }
    ]),

    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './src/index.html'
    })
  ],

  devtool: 'source-map'
}

export default config
