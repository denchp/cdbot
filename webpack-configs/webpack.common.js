const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, "../src");
const DIST_PATH = path.resolve(__dirname, "../dist");

module.exports = env => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunksSortMode: 'none',
            })
        ],
        resolve: {
            modules: ['node_modules', SRC_PATH]
        },
        entry: {
            polyfill: '@babel/polyfill',
            bundle: SRC_PATH + '/index.jsx'
        },
        output: {
            path: DIST_PATH + '/',
            publicPath: '/',
            filename: './js/[name].[contenthash].js'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    include: SRC_PATH,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { 'legacy': true}],
                                ["@babel/plugin-proposal-class-properties", {'loose': true}],
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-proposal-async-generator-functions'
                            ]
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [[
                                '@babel/preset-env', 
                                {
                                    "targets": { "browsers": [ "last 2 versions" ] }
                                }
                            ]],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { 'legacy': true}],
                                ["@babel/plugin-proposal-class-properties", {'loose': true}],
                                '@babel/plugin-proposal-async-generator-functions',
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-proposal-object-rest-spread'
                            ]
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    include: SRC_PATH,
                    loaders:[`file-loader?hash=sha512&digest=hex&name=./images/[hash].[ext]`,
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: { progressive: true },
                            gifsicle: { interlaced: false },
                            optipng: { optimizationLevel: 4 },
                            pngquant: { quality: '75-90', speed: 3 }
                        }
                    }]
                },
                {
                    test: /\.(mp3)$/i,
                    include: SRC_PATH,
                    loader:'file-loader',
                    options: {
                        name: `./audio/[name].[ext]`
                    }
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.(html|htm)$/,
                    loader: 'html-loader',
                    options: {
                        name: './[name].[ext]'
                    }
                },
            ]
        }
    };
}