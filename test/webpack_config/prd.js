//引入配置文件合并工具
const webpackMerge = require('webpack-merge'); 
// 引入公共配置
const webpack_config_base = require('./base.js'); 
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = webpackMerge.merge(webpack_config_base, {
  mode: "production",
  optimization: {
    // minimize: false,
    
    // // css压缩混稀
    // minimizer: [
    //   new OptimizeCSSAssetsPlugin({}),
    // ],
    
    // js压缩混稀
    // minimizer: [
    //   new TerserJSPlugin({}), 
    //   new OptimizeCSSAssetsPlugin({}),
    // ],
  },
});