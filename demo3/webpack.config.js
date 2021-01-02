
const path = require("path")

module.exports = {
  entry: {
    // main: './test/main.js', 
    main: './TicTacToe/main.js', 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'window.$fd_compile' },],
              '@babel/plugin-proposal-class-properties',
            ]
          },
        }, 
      }
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '0.0.0.0',
    port: 9000,
    open: true, 
  },
}



