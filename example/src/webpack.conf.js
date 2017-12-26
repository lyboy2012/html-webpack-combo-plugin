const HtmlWebpackPlugin = require('html-webpack-plugin');
const ComboPlugin = require('../../index')
module.exports = {
    entry: './example/src/index.js',
    output: {
        filename: './example/dest/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/src/index.html',
            filename: './example/dest/index.html'
        }),
        new ComboPlugin({
            baseUri: `http://test.domain.com/??`,
            splitter: ',',
            replaceCssDomain: `test.domain.com`,
            replaceScriptDomain: `test.domain.com`
        })

    ]
};