
const pathLib = require("path");
// const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 单文件入口 
  entry: pathLib.resolve(__dirname, '../src/main.js'),
  output: {
    // 定义输出文件名
    filename: '[name].[chunkhash].bundle.js',  
    // 定义输出文件夹dist路径
    path: pathLib.resolve(__dirname, '../dist')    
    // publicPath: './',
  },
  module: {
    rules: [
      // 处理 js 
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',],
            plugins: [
              ...require("fedom/babel_config_plugins.js"), 
            ],
          },
        }, 
      },
      // 处理 less  
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true, 
            },
          },
          {
            loader: '@justfn/css-scope-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // 每次打包前删除dist文件夹中的文件
    new CleanWebpackPlugin({  
      //dist文件夹下的favicon.ico文件和lib文件夹下的东西都忽略不进行删除
      // cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico', '!lib/**'],
    }),
    new HtmlWebpackPlugin({
      //指定html模板文件
      template: pathLib.resolve(__dirname, '../index.html'), 
      
      //如果项目没有html文件作为模板入口，可使用title和filename进行自动创建，这里使用模板
      // title: 'index'  
      // filename: 'index.html',
      
      // 指定网站图标
      // favicon: 'favicon.ico', 
      
      // js插入的位置，插入head中也会自动补defer="defer"属性以保证在页面加载后执行js，如果考虑兼容性可改成 body
      inject: 'body', 
      
      // minify: {
      //   // 可移除属性的引号
      //   // removeAttributeQuotes: true,
      // },
    }),
    // css独立打包
    new MiniCssExtractPlugin({ 
      filename: "[name]-[contenthash].css"
    }),
    
    // //全局引入jquery，此后在任何位置可直接使用$，Lodash或其他库也可以像这样引入，
    // // 当然也可以在dist目录的lib文件夹下放第三方库，在html模板中直接引入
    // new Webpack.ProvidePlugin({ 
    //   '$':'jquery'
    // }),
  ],
}



