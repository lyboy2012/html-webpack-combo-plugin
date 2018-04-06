const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ComboPlugin = require('../../index')
module.exports = {
    mode: 'production',
    entry: './example/src/index.js',
    output: {
        path: process.cwd(),
        filename: './example/dest/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/src/index.html',
            filename: './example/dest/index.html'
        }),
        new ComboPlugin({
            baseUri: `http://s.allspark.xin/??`,
            splitter: ',',
            replaceCssDomain: `allspark.xin`,
            replaceScriptDomain: `allspark.xin`
        })

    ]
};