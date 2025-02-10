const path = require("path");
const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'src'),
    port: 8080,
    open: true,
    hot: true
}
})
