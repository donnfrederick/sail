const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack             = require('webpack')
const devPort             = process.env.port || 8000
const assetsBase          = 'sail-production-assets.s3-ap-northeast-1.amazonaws.com'

const srcPath = (subdir) => {
  return path.join(__dirname, 'frontend', 'src', subdir)
}

module.exports = {
  entry: {
    app: [
      './frontend/src/script.tsx'
    ]
  },
  output: {
    filename     : '[name].bundle.js',
    chunkFilename: '[contenthash].bundle.js',
    path         : __dirname + '/public/assets/js',
    publicPath   : process.env.NODE_ENV === 'production'? `https://${assetsBase}/js/`: '/assets/js/',
  },
  optimization: {
    splitChunks: {
      name  : 'module',
      chunks: 'async',
    },
  },
  resolve: {
    alias: {
      components: srcPath('components'),
      constants : srcPath('constants'),
      hocs      : srcPath('hocs'),
      models    : srcPath('models'),
      mocks     : srcPath('mocks'),
      reducers  : srcPath('reducers'),
      store     : srcPath('store'),
      utils     : srcPath('utils'),
      lang      : srcPath('lang')
    },
    extensions: ['.js', '.ts', '.tsx'],
    plugins   : [new TsconfigPathsPlugin({ configFile: "./frontend/src/tsconfig.json" })]
  },
  devServer: {
    contentBase       : '/public/assets/',
    historyApiFallback: true,
    port              : devPort,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.tsx?$/,
        loader : 'tslint-loader',
        exclude: /(node_modules)/,
        options: {
          configFile: 'tslint.json',
          fix       : true,
        },
      },
      {
        test   : /\.tsx?$/,
        use    : 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
}
