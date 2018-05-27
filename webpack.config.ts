import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import { config as commonConfig } from './config/webpack.common.config'
import { config as productionConfig } from './config/webpack.prod.config'
import { config as developmentConfig } from './config/webpack.dev.config'

export default function(environment: any): webpack.Configuration {
    return merge(
        {},
        commonConfig, 
        environment && environment.production
            ? productionConfig
            : developmentConfig    
    );
}