const { resolve } = require('path')
// 4、动态引入打包后的css、js及压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 5、清除上一次打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 6、配置文件合并
const merge = require('webpack-merge')
// 7、获取命令携带参数
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || 'development'

const webpackConfig = require(`./config/webpack.${mode}.js`)

const webpackCommonConfig = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true
                        }
                    }, {
                        loader: 'eslint-loader',
                    }
                ],
                include: resolve(__dirname, 'src/'),
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                include: [resolve(__dirname, 'src/')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            outputPath: 'imgs', // 定义file-loader的输出文件夹
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [resolve(__dirname, 'src/')],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/')
        },
        extensions: ['.js', '.json']
    },
    externals: {
        jQuery: 'jQuery'
    },
    plugins: [
        // 动态引入打包文件
        new HtmlWebpackPlugin({
            title: 'wangyiyang',
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        // 清除目录插件
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: resolve(__dirname, 'dist')
        })
    ]
}

module.exports = merge(webpackCommonConfig, webpackConfig)