# JavaScript模块化笔记
## 目录
- [IIFE](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#iife)
- [commonJS](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#commonjs)
- [AMD](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#amd)
- [CMD](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#cmd)
- [UMD](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#umd)
- [ES6](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#es6module)
- [参考资料](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#参考资料)
***
### IIFE
#### 放大模式
```javascript
(function(module){
  //do something
  return module;
})(module)
```
必须按顺序加载
#### 宽放大模式
```JavaScript
(function(module){
  //do something
  return module;
})(module||{})
```
可不按顺序加载
### commonJS
#### 规范
- 模块上下文
1. 有自由变量require，并符合关于它的定义。
2. 有自由变量exports，模块的导出必须是exports对象。
3. 有自由变量module，它必须有id属性（只读）
- 模块标识符
1. 模块标识符是由'/'分割的词组成。词必须是驼峰式或'.'或'..'。
2. 可以没有'.js'的扩展名。
3. 
- require
1. 是一个函数，参数为模块标识符，返回值为exports对象。
2. 请求的模块不能返回，函数必须抛出error。
3. 
4. 可能有main属性，属性值必须为undefined或已加载的module对象。
#### 用法
```javascript
const fs = require('fs');
//do something
module.exports = {
  //添加一些属性，方法
}
```
### AMD
Asynchronous Module Definition(异步模块定义)
#### 标准
本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：define(id?, dependencies?, factory)。
- id:是定义中模块的名字（String）,默认为模块加载器请求的指定脚本的名字。
- dependencies：是定义中模块所依赖模块组成的数组。默认为["require", "exports", "module"]，它们按照CommonJS模块规范自由变量去解析。依赖模块必须根据模块的工厂方法优先级执行，并且执行结果应该按照依赖数组中的位置顺序以参数形式传入工厂方法中。
> 简单commonjs转换
> 1. 有依赖参数，不在工厂方法中扫描依赖。
> 2. 无依赖参数，扫描工厂方法中的依赖。
- factory:模块初始化时执行的函数（仅在模块被加载后执行一次，返回值作为模块的输出）或一个作为模块输出的对象，
#### 用法
```javascript
//定义模块
define('m1',function(require,exports,module){
  return {
    //添加一些属性，方法
  };
});
```
```html
//使用模块
<script src='https://cdn.bootcss.com/require.js/2.3.5/require.min.js'></script>
<script>
  //模块的加载不影响它后面语句的运行,即require（）执行完继续执行do（），等模块加载完，才执行回调函数。
  require(['m1'],function(){
    //do something
  });
  do();
</script>
```
### CMD
模块定义规范(Common Module Definition) 
#### 标准
- 模块上下文
一个模块是用define关键字定义的，这是一个函数，接受一个factory参数。
1. factory参数可以是函数或其他有效值。
2. factory如果是函数，函数前三个参数必须为`require`，`exports`，`module`。
3. factory如果不是函数，则将其设为模块的输出对象。
>- require
>1. 是一个函数，参数为模块标识符，返回值为引入模块的输出。
>2. 如果请求模块不能返回，函数应返回null。
>3. require.async是一个函数，参数为模块标识符列表和可选参数回调函数。
>回调函数参数对应模块标识符列表中各模块的输出。
>- exports  
模块的唯一输出。
>- module
>1. 有exports属性，其与exports一致。
>2. 有url属性，值为模块的绝对路径。
>3. 有dependencies属性，值为依赖模块的列表。
- 模块标识符
1. 模块标识符必须是字符串。
2. 可能没有文件扩展名.js。
3. 可以是相对路径。
#### 用法
- 定义
```javascript
define(function(require, exports, module){

  module.exports = {
    //一些操作
  };
})
```
- 使用
```javascirpt
<script src='https://cdn.bootcss.com/seajs/3.0.2/sea.js'></script>
<script>seajs.use(文件路径)</script>
```
### UMD
通用模块定义
> 兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范
#### 用法
```javascript
(function(window, factory){
  if(typeof define === ' function' && define.amd){
    define([], factory);
  }else if(typeof exports === 'object'){
    module.exports = factory(require(''));
  }else{
    window.exports = factory();
  }
})(this, function(){
  //some things
  return {
    //output
  }
})
```
### ES6module
- 模块上下文中默认为严格模式。
- 模块上下文可以使用import和export关键字。
#### 用法
- 定义
```javascript
//属性/方法
export attr；
export function method(){}
//简写
export {attr， method};
//重命名
export {realName as alias};
//默认导出
export obj as default或export default { key1: value1, }
```
- 使用
```javascript
//导入属性/方法
import {attr, method} from '模块';
//导入全班
import * from '模块';
//重命名
import {realName as alias} from '模块';
import * as obj from '模块';
//默认导入
import 名字 from '模块';相当于import default as 名字 from '模块';>
//聚合模块(当前模块作用域无法使用导入内容)
export {attr, method} from '模块';
```
***
## 参考资料
1. [CommonJS简介及模块标准](http://blog.csdn.net/woxueliuyun/article/details/46347269)
2. [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
3. [require.js的用法](http://blog.csdn.net/shixihaoma/article/details/38714977)
4. [CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)
5. [SeaJS使用详细教程](http://blog.csdn.net/meitesiluyuan/article/details/48969169)
6. [关于 CommonJS AMD CMD UMD 规范的差异总结](https://www.cnblogs.com/imwtr/p/4666181.html)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
***
