// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

module.exports = {
    // Other Webpack configurations
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
        ]
    }
};
