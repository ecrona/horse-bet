import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const config: webpack.Configuration = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/index.tsx'
  ],

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: false,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './dist/client/index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        USE_MOCK: JSON.stringify(process.env.USE_MOCK)
      }
    })
  ],

  devServer: {
    hot: true,
    contentBase: './dist/client',
    host: 'localhost',
    port: 8080,
    clientLogLevel: 'error',
    historyApiFallback: true
  }
}

export default config
