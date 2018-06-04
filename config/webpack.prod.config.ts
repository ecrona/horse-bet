import * as path from 'path'
import * as webpack from 'webpack'

export const config: webpack.Configuration = {
  entry: ['./src/index.tsx'],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        exclude: path.resolve(__dirname, '../node_modules')
      }
    ]
  },

  optimization: {
    minimize: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}

export default config
