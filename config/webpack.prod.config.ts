import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const config: webpack.Configuration = {
  mode: 'production',

  entry: ['./src/client/index.tsx'],

  optimization: {
    minimize: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './src/index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}

export default config
