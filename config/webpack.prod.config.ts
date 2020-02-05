import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

export const config: webpack.Configuration = {
  mode: 'production',

  entry: ['./src/client/index.tsx'],

  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
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
