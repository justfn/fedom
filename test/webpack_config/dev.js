const pathLib = require('path');
const webpackMerge = require('webpack-merge');
const webpack_config_base = require('./base.js');
// const webpack = require('webpack');

module.exports = webpackMerge.merge(webpack_config_base, {
  mode: 'development',
  //控制台提示信息映射
  devtool: "inline-source-map", 
  //开发服务器
  devServer: { 
    // 无法使用 ? 
    // contentBase: pathLib.resolve(__dirname, "../dist"),
    
    host: '127.0.0.1',
    port: 9000,
    // 自动打开浏览器
    open: true,  
    
    // 反向代理，根据需求自行修改
    // proxy: { 
    //   "/api": {
    //     target: "http://127.0.0.1:3001",
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   },
    //   "/resource": {
    //     target: "http://127.0.0.1:3002",
    //     pathRewrite: {
    //       "^/resource": ""
    //     }
    //   }
    // },
    
    // 让webpackDevServer开启热更新功能
    // hot: true, 
    
    // 当hot module replacement功能没生效时，也不允许浏览器重新加载
    // hotOnly: true 
  },
  
  // 如需热更新，开启下面代码
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
  
  // optimization: {
  //   minimize: false,
  // },
});
  
  
  

