
const path = require("path")

module.exports = {
  entry: {
    main: './web/main.js', 
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
              [
                '@babel/plugin-transform-react-jsx', 
                { 
                  pragma: 'window.$fd.compiler' 
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ]
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



