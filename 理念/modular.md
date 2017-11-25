# JavaScript模块化笔记
## 目录
- [IIFE](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#IIFE)
- [commondJS](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#commondJS)
- [AMD](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/modular.md#AMD)
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
### commondJS
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
#### 标准
(注 *本小节部分内容来自https://github.com/amdjs/amdjs-api/wiki/AMD*)
本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：define(id?, dependencies?, factory)。
- id:是定义中模块的名字（String）,默认为模块加载器请求的指定脚本的名字。
- dependencies：是定义中模块所依赖模块组成的数组。默认为["require", "exports", "module"]，它们按照CommonJS模块规范自由变量去解析。依赖模块必须根据模块的工厂方法优先级执行，并且执行结果应该按照依赖数组中的位置顺序以参数形式传入工厂方法中。
> 简单commonjs转换
1. 有依赖参数，不在工厂方法中扫描依赖。
2. 无依赖参数，扫描工厂方法中的依赖。
- factory
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
require(['m1'],function(){
  //do something
});
</script>
```
## 参考资料
1. [CommonJS简介及模块标准](http://blog.csdn.net/woxueliuyun/article/details/46347269)
2. [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
***
