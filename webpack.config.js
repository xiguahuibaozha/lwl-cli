const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    target: 'node', // 设置文件的依赖
    entry: "/bin/cli.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cli.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            // 保留注解
            new TerserPlugin({
                terserOptions: {
                    format: { // 保留指定注释
                        comments: /#!*/,
                    },
                },
                extractComments: false, // 是否将注释剥离到单独的文件中
            }),
        ],
    },
    // module: {
    //     rules: [
    //        {
    //             test: /\.js$/,
    //             exclude: /node_modules/,  // 无需对第三软件库进行转换，因为它们已经做了转换
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: ["@babel/preset-env"]
    //             }
    //        } 
    //     ]
    // }
};