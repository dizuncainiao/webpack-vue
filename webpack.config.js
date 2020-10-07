const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 使用解构引入，webpack 中文文档教程该块代码已过时
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 多进程并行压缩js插件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const WebpackConfig = {
  // 入口js
  entry: {
    app: './src/main.js',
  },
  output: {
    // 输出路径 - 不存在即创建文件夹
    path: path.resolve(__dirname, 'dist'),
    // 输出文件名称
    filename: '[name].js',
    // 打包后资源的地址前缀 - 目前只有在 webpack-dev-middleware 中使用
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // 提取 css 为 .css文件 引入
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true
              }
            },
          }
        ],
      },
      {
        // 加载图片
        test: /\.(png|jpg)$/, use: ['file-loader']
      },
      {
        // 加载字体
        test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']
      },
      {
        // 加载vue文件
        test: /\.vue$/, use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    // 优化 moment.js
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 压缩js插件
    new ParallelUglifyPlugin({
      uglifyJS: {},
      test: /.js$/g,
      include: [],
      exclude: [],
      cacheDir: '',
      workerCount: '',
      sourceMap: false
    }),
    new VueLoaderPlugin(),
    // 更改您的配置文件以告诉 CleanWebpackPlugin 我们不想在监视触发增量构建后删除 index.html 文件，我们可以使用 cleanStaleWebpackAssets 选项来执行此操作：
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    // 提取 css
    new MiniCssExtractPlugin(),
    // 生成 html 文件，并将生成的所有 bundle文件 自动引入到 html中
    new HtmlWebpackPlugin({
      // 初始模板
      template: './public/index.html',
      // cdn不是HtmlWebpackPlugin默认配置， 但可在index.html中 以 'htmlWebpackPlugin.options.cdn.js' 读取数据
      cdn: {
        js: [
          'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
          'https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
          'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js'
        ]
      }
    }),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new Webpack.NamedModulesPlugin(),
    // 模块热替换插件
    new Webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 用于开发环境的错误调试定位
  devtool: '(none)',
  devServer: {
    // 告诉服务器从哪里提供内容
    contentBase: './public',
    // 在浏览器中打开
    open: true,
    // 端口号
    port: 8080,
    // 启用 webpack 的模块热替换（ps：不刷新页面更新代码）
    hot: true,
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
    publicPath: '/'
  },
  // 以下js使用cdn外部引入
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
  }
}

module.exports = WebpackConfig
