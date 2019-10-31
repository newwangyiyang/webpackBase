const { resolve } = require('path')
// 1、抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 2、压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 3、压缩js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 4、打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    output: {
        filename: 'main.[hash].js',
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
        // 压缩js
        minimizer: [new UglifyjsWebpackPlugin({
            cache: true,
            sourceMap: true,
            parallel: true
        })],
    },
    plugins: [
        // 抽离css为单独文件
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        // 打包分析
        new BundleAnalyzerPlugin()
    ]
}