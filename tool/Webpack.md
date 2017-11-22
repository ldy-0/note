# Webpack笔记
***
## 目录
- [介绍](https://github.com/person-0/note/blob/master/tool/Webpack.md#介绍)
- [基础理论](https://github.com/person-0/note/blob/master/tool/Webpack.md#基础理论)
- [用法](https://github.com/person-0/test/note/master/tool/Webpack.md#用法)
- [插件](https://github.com/person-0/test/note/master/tool/Webpack.md#插件)
### 介绍
> 模块打包工具，从入口文件开始，递归地构建依赖关系图，然后根据依赖关系图将所需模块打包为能被浏览器直接加载的少量文件。
##### 为什么创造它？
###### 问题1：现在页面正在复杂化，大型化发展，代码量和依赖急速增长，开发和维护成本随之提高，怎么办？
解决方案是JavaScript模块化。
###### 问题2：模块化之后开发效率提高了，但文件数量也增加了，影响性能，同时现在有使用SCSS，TypeScript等浏览器不能直接加载的文件，怎么办？
webpack就是解决方案。
***
### 基础理论
（注 *本小节部分内容参考doc.webpack-china.org*）
#### 入口
webpack会构建依赖关系图，图的起点就是入口，具体到应用中就是启动文件。
#### 出口
webpack打包之后会生成一个文件，出口就是该文件的输出路径。
#### 模块
在开发中将程序分解成一个个的离散功能块，简称为模块。具体到nodejs中就是一个带exports的js文件，css/sass/less中就是一个css文件，HTML中就是一个HTML文档等等，webpack中的模块就是他们的综合，即一个js文件，一个css文件，一个图片均是webpack的模块。那webpack怎么处理不同的文件呢？请看装载机。
#### 装载机
将其他类型文件转化为依赖图能直接引用的模块。比如一个TypeScript文件，可通过ts-loader转化为一个js文件。需要处理什么文件，就安装对应的loader。
#### 插件
用于执行范围更广的任务。
### 用法
#### 安装
1. 全局安装
`npm install -g webpack`
2. 应用中安装
`npm install --save webpack`
3. 测试
- 安装测试
`webpack -v`
显示出版本号,代表成功安装。
- 打包测试
`webpack 入口文件 出口路径`  
![测试](https://github.com/person-0/images/blob/master/webpack/%E6%B5%8B%E8%AF%95.PNG)  
如果出现图片信息，代表打包成功。
#### 基础用法
##### 配置文件
（注 *本小节部分内容来自https://doc.webpack-china.org/guides/getting-started*）  
大多数项目会需要很复杂的设置，配置文件比在终端(terminal)中输入大量命令要高效的多，这就是为什么 webpack 要支持配置文件。
###### 写法
1. 在项目根目录创建名为webpack.config.js的文件。（**目录下有该文件，不能再使用打包测试时的写法。**）  
2. 编写webpack.config.js文件:
```javascript
const wp = require('webpack');
module.exports = {
 //具体配置信息
};
```
3. 在命令行中进入项目根目录下，输入`webpack`回车，之后显示打包测试时的信息时，说明打包完成。
##### 单入口，单出口
> 按下图格式编写webpack.config.js文件。  
![输入输出标准写法](https://github.com/person-0/images/blob/master/webpack/%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.PNG)
###### 简写
![输入输出简写](https://github.com/person-0/images/blob/master/webpack/%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E7%AE%80%E5%86%99.PNG)
##### 多入口，多出口
按下图格式编写webpack.config.js文件。  
![多输入输出](https://github.com/person-0/images/blob/master/webpack/%E5%A4%9A%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA.PNG)
##### 处理多种类型文件
1. 安装对应文件的loader如：
`npm install --save 文件类型-loader`（loader具体命名请看[loader类型](https://doc.webpack-china.org/loaders)）
2. 在webpack.config.js文件中配置
```javascript
module.exports = {
  entry: __dirname+'/src/index.js',//index.js引用了css文件
  output: {
    path: __dirname+'/dist',
    filename: 'out.js',
  },
  module: {
    rules: [
      {test: /\.css$/, use: ['style.loader', 'css.loader']},
      {test: /\.json$/, use: 'json-loader'}
    ],
  },
}
```
还有其他二种写法，但是不推荐使用。（想了解请看[其他写法](https://doc.webpack-china.org/concepts/loaders/#-)）
#### 插件
- html-webpack-plugin
###### 用途
> 在index.html中引用了index.bundle.js（由index.js打包得到），现在由于一些原因，改变了index.bundle.js的名字，
> - 传统做法是在webpack.config.js文件中修改，然后再去index.html中修改，
> - 使用插件后只需在webpack.config.js文件中修改即可。
1. 安装插件`npm install --save html-webpack-plugin`
2. 配置插件
```javascript
const htmlplugin = require('html-webpack-plugin');
module.exports = {
 entry: '/src/文件',
 output: {
  path: __dirname+'/dist',
  filename: 'out.js',
 },
 module: {
  rules: [
   {test: /\.css$/, use: 'css.loader'},
  ],
 },
 plugins: {
  new htmlplugin({
   title: 'htmlplugin',
  })
 },
};
```
#### 参考资料
1. [webpack官方文档](https://doc.webpack-china.org/concepts/#-plugins-)
***
![署名](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
