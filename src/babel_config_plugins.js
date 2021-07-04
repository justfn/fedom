/** 框架需配置的 babel 插件 
使用见: test/webpack.config.js 
*/


module.exports = [
  // 支持修饰器语法 
  [
    "@babel/plugin-proposal-decorators", 
    { "legacy": true }
  ],
  // 支持 class 语法  
  '@babel/plugin-proposal-class-properties',
  // 支持 jsx 编译 
  [
    '@babel/plugin-transform-react-jsx', 
    { 
      pragma: 'window.$fd.compiler', // 定义的全局编译方法 
    },
  ],
]

