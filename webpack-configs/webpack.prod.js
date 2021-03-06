const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

const ENV_FILE = path.resolve(process.cwd(), '.prod.env')
const env = dotenv.config({ path: ENV_FILE }).parsed;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(env), {
    mode: 'production'
})