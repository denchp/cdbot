const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

const ENV_FILE = path.resolve(process.cwd(), '.dev.env')
const env = dotenv.config({ path: ENV_FILE }).parsed;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(env), {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
    }    
})