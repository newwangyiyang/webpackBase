const { resolve, join } = require('path')
// 1、抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 2、压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 3、压缩js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 4、打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 5、css tree shaking
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
// 6、js压缩 

module.exports = {
    output: {
        filename: 'js/main.[hash].js',
        path: resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                // require('autoprefixer')(),
                                require('postcss-cssnext')(),
                                require('postcss-import')(),
                            ]
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        // 将chunk映射list从main.js进行抽离，防止缓存cache无效
        runtimeChunk: {
            name: 'runtime'
        },
        // 将公共代码抽离
        splitChunks: {
            cacheGroups: {
              commons: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
                minSize: 0, // This is example is too small to create commons chunks
                name: 'common'
              }
            }
        }
    },
    plugins: [
        // 抽离css为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        // css tree shaking
        new PurifyCSSPlugin({
            // node 路径扫描
            paths: glob.sync(join(__dirname, '../src/*.html'))
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin({
            parallel: true
        }),
        // webpack官方压缩js
        // new UglifyjsWebpackPlugin({
        //     cache: true,
        //     sourceMap: true,
        //     parallel: true
        // }),
        // 压缩js、es6
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
              output: {
                beautify: false, //不需要格式化
                comments: false //不保留注释
              },
              compress: {
                warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
              }
            }
        }),
        // 打包分析
        new BundleAnalyzerPlugin()
    ]
}