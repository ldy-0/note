## 目录
- [JSON](https://github.com/person-0/note/blob/master/data/format.md#json)
- [GeoJSON](https://github.com/person-0/note/blob/master/data/format.md#geojson)
- [MIME](https://github.com/person-0/note/blob/master/data/format.md#mime类型)
- [CSV](https://github.com/person-0/note/blob/master/data/format.md#csv)
- [参考](https://github.com/person-0/note/blob/master/data/format.md#参考)
***

### JSON
轻量级数据交换格式。(全称JavaScript Object Notation) 
- 格式
1. 键名、字符串必须用""包裹。
2. 数字不能使用Infinity，NaN。
3. 对象，数组不能有尾随逗号','。
- 特点
1. 使用 JavaScript 语法来描述数据对象，但是它仍然独立于语言和平台。
2. 具有自我描述性，更易理解。
3. 体积小，易解析。

- 序列化问题
1. Symbol类型、Function对象会被忽略。
2. 稀疏矩阵中未赋值元素赋值null。
3. 日期对象会被转为字符串。
4. Regexp对象会被解析为空对象{}
5. 原型变为Object.prototype
6. 存在循环引用时报错
```javascirpt
let obj = {};
obj.self = obj;
错误：TypeError: Converting circular structure to JSON
```

### JSON5
JSON超集
- 格式
1. string可以使用单引号，可以'\'换行，可以包含转义字符
2. number可以使用16进制，+-Infinity，NaN，小数点前后可以省略，可以显时使用+
3. 对象，数组可以有尾随逗号','。
4. 键名可以不使用双引号或使用单引号。
5. 支持单行/多行注释  
- refs:
1. [JSON5标准](https://spec.json5.org/#summary-of-features)
2. [JSON5中文翻译](https://segmentfault.com/a/1190000016199847)

***

### GeoJSON
用于编码各种地理数据结构的格式。
地理坐标系:WGS-84

*** 

### MIME类型
全称：多用途互联网邮件扩展（Multipurpose Internet Mail Extensions）
> ###### 和文件扩展名的区别
> 文件扩展名是操作系统中标识文件格式的机制。
	MIME是电子邮件和网络通信中标识信息格式的机制。

***

### CSV
一种通用、相对简单的文件格式。
- 格式
1. 以纯文本表示数据
2. 以行为单位，一行数据不换行，无空行。
3. 半角逗号做分隔符。

### 参考
1. [JSON官网](http://www.json.org/json-zh.html)
2. [GeoJSON](http://geojson.org/)
3. [既然有文件后缀名,为何还需要MIME类型?](https://www.zhihu.com/question/60495696)
***

<!-- ![by4.0](https://licensebuttons.net/l/by/4.0/88x31.png)   -->
<!-- 本页采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际</a>进行许可。 -->
