
const path = require("path")

module.exports = {
  entry: {
    main: './main.js', 
  },
  // output: {
  //   publicPath: './',
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
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
            loader: 'less-loader',
          },
          {
            loader: '@justfn/less-scope-loader',
          },
        ],
      },
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '127.0.0.1',
    port: 9000,
    open: true, 
  },
}



