# JavaScript模块化笔记
## 目录
- [IIFE](https://github.com/person-0/note/edit/master/%E7%90%86%E5%BF%B5/modular.md#IIFE)
- [commondJS](https://github.com/person-0/note/edit/master/%E7%90%86%E5%BF%B5/modular.md#commondJS)
- [参考资料](https://github.com/person-0/note/edit/master/%E7%90%86%E5%BF%B5/modular.md#参考资料)
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
## 参考资料
1. [CommonJS简介及模块标准](http://blog.csdn.net/woxueliuyun/article/details/46347269)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本作品采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
***
