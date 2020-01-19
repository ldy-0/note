const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/**
 * 
 * ---------- command invoke
 * --config xxx.js 使用xxx.js作为配置文件,默认webpack.config.js, 配置文件可导出Object|Function
 * --watch 观察模式
 * 
 * ---------- script invoke
 * webpack(config, callback(err, info){}) config必须为对象
 * info.toString(opt) 打包信息
 * info.hasErrors() 打包是否成功
 * 
 */

/**
 * 
 * ## Error
 * 
 * 1. DeprecationWarning: Tapable.plugin is deprecated.
 *    不支持w4  https://segmentfault.com/q/1010000013488209
 * 
 */ 

// create one HTMLfile and inject module via tag
const HtmlPlugin = require('html-webpack-plugin');

// extract css to cssFile and inject page via <link> tag(w4+)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// analyze file size
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// provide cache.(w5将内置)
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// clean files. default clean directory: output.path/*
const CleanPlugin = require('clean-webpack-plugin');
// v3.0.0+ : const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// copy file/dir to dist
const CopyPlugin = require('copy-webpack-plugin');

/**
 * 
 * Config
 * 
 */
let htmlPluginOpt = {
      title: 'custom-title',
      meta: {
        viewport: 'width=device-width',
        meta: 'charset: utf-8',
      },
      template: './index.html', // entry default: src/index.ejs
      filename: 'first.html', // output default: dist/[name].html
      chunks: ['first'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      }, // 压缩
      test: 1, // 自定义属性, 在html文件中可以<%= htmlWebpackPlugin.options.test %>引用 <%= %>ejs语法
    };

let cssExtractOpt = { 
  filename: '[id][name][contenthash].css', // output
  // chunkFilename: '[name][hash].css'
};

let defineOpt = {
  DOMAIN: '"https://www.baidu.com"', // key [String] 
  ttt: { name: "'obj'" }, // value [String|Object] other type -> string, value is Object, ttt -> Object({ name: "obj" })
  'typeof testType': '"123"',
};

let copyOpt = [
  { from: './static' }, // to default: dist/
];

let postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer'),
    ]
  }
};

/**
 * 
 * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * config Object
 * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 */ 
module.exports = {
  mode: 'development',
  watch: true,                  // 监听文件变化, webpack recompile when file change
  devtool: 'inline-source-map', // 是否生成sourceMap. default: false

  // context: path.resolve(__dirname, 'html'),

  // 配置包信息
  /**
   * 
   * syntax: 1. value: String|Array, chunkName: main
   *         2. value: Object, chunkName: obj.key
   * 
   */
  entry: {
    first: './src/index.js',
  }, 

  // 1. default: { path: './dist', filename: '[name].js' }
  output: {
    path: path.resolve('./dist'),  // 指定生成文件的存储位置
    filename: '[name].js',         // hash(编译)和chunkhash(chunk)不能一起使用
    publicPath: '',                // 指定生成url的prefix 1. default(相对页面): '' 2. 相对域名: '/path' 3. 相对协议： '//cdn.com/path' 4. 绝对：'https://t.com/path'

    // 详解webpack的out.libraryTarget属性 https://blog.csdn.net/frank_yll/article/details/78992778
    // libraryTarget: 'umd',       // 指定包类型 var(default)|assign|this|window|commonjs|amd|umd
    // library                     // 指定包导出名
    // globalObject                // 当包类型为umd, 指定包挂载的对象
  }, 

  // 配置模块路径
  resolve: {
    extensions: ['.js', '.css'], // 省略扩展名
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  },

  // 外部扩展
  externals: {
    echarts: 'echarts',         // 查找global variable
    xlsx: 'XLSX',
    // 对象模式: output.libraryTarget必须为'umd'
    // echarts: {
    //   commonjs: 'echarts',   // require('echarts')
    //   commonjs2: 'echarts',
    //   root: 'echarts',       // 查找global variable
    // },
  },

  plugins: [
    new HtmlPlugin(htmlPluginOpt),
    // new ExtractTextPlugin('index.css'),
    new MiniCssExtractPlugin(cssExtractOpt),

    new webpack.DefinePlugin(defineOpt),
    new webpack.ProgressPlugin(),

    // new CopyPlugin(copyOpt),
    new CleanPlugin(),
    // new HardSourceWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],

  resolveLoader: {
    // 自定义loader,plugins: https://www.jianshu.com/p/c021b78c9ef2
    modules: ['node_modules', './src/loader/'], // loader查找目录(添加自定义loader)
  },
  module: {
    rules: [
      /**
       * 
       * babel原理: https://www.jianshu.com/p/b4b93ee8050d
       * babel v7+ 1. .babelrc->babel.config.js    2. score package
       * @babel/preset-env 提供目标环境不支持的语法
       * @babel/polyfill 提供目标环境不支持的特性 https://www.cnblogs.com/chengfeng6/p/9813024.html
       * @babel/plugin-transform-runtime depend @babel/runtime
       * babel-loader 
       * babel配置: https://www.cnblogs.com/tugenhua0707/p/9452471.html
       * 
       * Error
       * 1.  this.setDynamic is not a function 
       * babel-loader(v7+)和babel其他包(v7-)版本冲突 https://www.cnblogs.com/steamed-twisted-roll/p/11243398.html
       * 2.  regenerator-runtime
       * 没有@babel/plugin-transform-runtime
       * 
       */
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { 
            loader: 'babel-loader',
            options: {
              presets: [ 
                ['@babel/env'],
                // ['@babel/env', { useBuiltIns: 'usage', } ] 
              ], // 插件预设集合
            },
          },
        ],
      },

      /**
       * 
       * postcss-loader: use PostCss translation css file
       * css-loader: parse CSS file to code
       * style-loader: adds css to DOM by inject <style> tag
       * 
       */
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', postcssLoader],
        // use: ExtractTextPlugin.extract(['style-loader', 'css-loader']),
      },
      { test: /\.(woff|tff|woff2)$/, use: ['file-loader'], },

      /**
       * 
       * vue-loader
       * v15+ 必须在plugins中注册vue-loader/lib/plugin(将webpack配置文件定义的rules应用于vue文件中的<style><script>块)
       * vue-style-loader: dynamic inject CSS via <style> as style-loader
       * 
       */
      // {
      //   tet: /\.vue$/,
      //   loader: 'vue-loader',
      // }

      /**
       * 
       * url-loader 小于限制的图片转base64, 其他用file-loader
       * file-loader 
       * image-webpack-loader 压缩图片
       * 
       */
      // {
      //   test: /\.(png|jpe?g|svg|gif)%/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10000,
      //         outputPath: 'images/',
      //       },
      //     },
      //     'image-webpack-loader',
      //   ]
      // }

    ],

  },

  /**
   * 
   * 优化
   * 
   */
  optimization: {
    // 压缩 
    // https://www.cnblogs.com/sunshq/p/10910870.html
    minimize: true, // 是否使用minimizer压缩 1.false (mode=development) 2.true (mode=production)
    //  自定义压缩工具 1. TerserWebpackPlugin 使用内置terser-webpack-plugin压缩js(default)  2. optimize-css-assets-webpack-plugin 压缩css
    minimizer: [],
  },

  /**
   * 
   * 开发环境 https://segmentfault.com/a/1190000013586090
   * 
   */
  devServer: {
    inline: true,  // real update
  },

  /**
   * 
   * 性能
   * 
   */
  performance: {
    
  },
}


/**
 * 
 * 1. w4 config
 * https://www.colabug.com/5088615.html
 * w4优化 https://www.cnblogs.com/wmhuang/p/8967639.html
 * babel https://www.cnblogs.com/htoooth/p/9724609.html
 * 2. HMR
 *   https://blog.csdn.net/GitChat/article/details/78341649
 *   hmr实现 https://blog.csdn.net/pedrojuliet/article/details/81701406
 *   wds原理 https://blog.csdn.net/liangklfang/article/details/56848925
 * 3. 教程
 *   https://blog.csdn.net/qq20004604/article/details/78689170
 *   https://blog.csdn.net/weixin_34067049/article/details/88022047
 *   webpack多页应用架构系列 https://segmentfault.com/a/1190000006863968
 * 
 * 构建速度优化: https://segmentfault.com/a/1190000020485804
 * 
 * 4. source
 *   https://www.cnblogs.com/QH-Jimmy/p/8043466.html
 * 
 * Cannot find module 'webpack/lib/node/NodeTemplatePlugin' https://blog.csdn.net/u013240543/article/details/51792261
 * 也可以 npm link webpack
 * 
 */
