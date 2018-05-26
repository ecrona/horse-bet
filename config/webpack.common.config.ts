import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

export const config: webpack.Configuration = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },

    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/, 
            use: 'source-map-loader'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            inject: true,
            template: './public/index.html'
        }),
    ],

    devtool: 'source-map',
};

export default config;