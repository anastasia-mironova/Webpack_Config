const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimizate = () => {
    const config = {
        splitChunks: {
            chunks: 'all'

        },
        minimize: isProd
    }

    if (isProd) {
        config.minimizer = [new OptimizeCssAssetWebpackPlugin(),
        new TerserWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
        ]
    }
    console.log(config)
    return config
}
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}
module.exports = {
    devtool: isDev ? 'source-map' : '',
    mode: "development",
    // watch: true,
    context: path.resolve(__dirname, 'src'),
    watchOptions: {
        ignored: ["node_modules/**"],
    },
    entry: { main: ['@babel/polyfill', './index.js'] },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: 'all'

        },
        // minimizer: [new OptimizeCssAssetWebpackPlugin(),
        // new TerserWebpackPlugin()
        // ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new PrettierPlugin({
            printWidth: 80,               // Specify the length of line that the printer will wrap on.
            tabWidth: 2,                  // Specify the number of spaces per indentation-level.
            useTabs: false,               // Indent lines with tabs instead of spaces.
            semi: true,                   // Print semicolons at the ends of statements.
            encoding: 'utf-8',            // Which encoding scheme to use on files
            extensions: [".js", ".ts"]  // Which file extensions to process
        },
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    }
                ]
            }))
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: jsLoaders()
            },
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         cache: true,
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader', 'eslint-loader'],
            // },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(ttf)$/i,
                use: ['file-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/i,
                use: ['csv-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: isDev
    }

}
