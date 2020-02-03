import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import webpack from 'webpack'

export const config: webpack.Configuration = {
  mode: 'production',

  entry: ['./src/client/index.tsx'],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new (webpack.DefinePlugin as any)({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}

export default config
