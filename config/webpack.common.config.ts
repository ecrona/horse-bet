import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as webpack from 'webpack'

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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['last 2 versions', 'not ie > 0']
                }
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
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss'), require('autoprefixer')]
            }
          }
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
      hash: true,
      template: './src/index.html'
    })
  ],

  devtool: 'source-map'
}

export default config
