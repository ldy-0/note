# Webpack笔记
***
## 目录
- [介绍](https://github.com/person-0/test/edit/master/Webpack.md#介绍)
- []()
### 介绍
> 模块打包工具，从入口文件开始，递归地构建依赖关系图，然后根据依赖关系图将所需模块打包为能被浏览器直接加载的少量文件。
##### 为什么创造它？
###### 问题1：现在页面正在复杂化，大型化发展，代码量和依赖急速增长，开发和维护成本随之提高，怎么办？
解决方案是JavaScript模块化。
###### 问题2：模块化之后开发效率提高了，但文件数量也增加了，影响性能，同时现在有使用SCSS，TypeScript等浏览器不能直接加载的文件，怎么办？
webpack就是解决方案。
***
### 基础理论
#### 入口
webpack会构建依赖关系图，图的起点就是入口，具体到应用中就是启动文件。
#### 出口
webpack打包之后会生成一个文件，出口就是该文件的输出路径。
#### 装载机

### 使用
#### 
`npm install -g webpack`
***
![署名](https://licensebuttons.net/l/by/4.0/88x31.png)  
本作品采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。