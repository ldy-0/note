# 目录
  - [字符](https://github.com/person-0/note/blob/master/data/format.md#character)
  - [URI](https://github.com/person-0/note/blob/master/data/format.md#URI)
  - [JSON](https://github.com/person-0/note/blob/master/data/format.md#json)
  - [GeoJSON](https://github.com/person-0/note/blob/master/data/format.md#geojson)
  - [MIME](https://github.com/person-0/note/blob/master/data/format.md#mime类型)
  - [CSV](https://github.com/person-0/note/blob/master/data/format.md#csv)
  - [参考](https://github.com/person-0/note/blob/master/data/format.md#参考)

***

## 字符
字符集：字符与数字映射关系的集合。(这个数字为码点)
字符编码：码点的存储方式 (ascll|utf-8|utf-16,最小存储单元为码元(存储码点的字节序列))

#### iso-8859-1编码(单字节编码): 使用latin-1(字符集) 

#### unicode标准
##### unicode CCS(编码字符集)
unicode标准: 定义全球通用的字符集(unicode字符集)
ISO标准: 通用字符集/universal character set(UCS-2字符集/UCS-4字符集)

码点分为7个区域: Graphic | Private-use(私人使用区) | Surrogate(代理区)
USV(Unicode scalar value) Unicode标量值: 非Surrogate的码点 

> \u4e00-\u9fbf CJK Unified Ideographs(中日韩统一表意文字)  
> \u4e00-\u9fa5(20901) 基本中文  
> \ud800-\udfff(2048) 代理区  
> \ue000-\uf8ff(6400) PUA(private user area)

##### unicode CES(字符编码方案)
	- UTF-32编码: 所有字符由四个字节表示, litter endian  (固定长度编码)
  - UTF-16编码: 基础平面字符由二个字节表示, 增补平面字符四个字节表示。 (可变长度编码)(在早期所有字符由两个字节表示(部分人称UCS-2编码))
    > encode: 0x20000 - 0x10000, 0x10000 / 1024 = 0x40, 0x10000 % 1024 = 0x40
    > decode: 0x40 * 1024 + 0x00 + 0x10000 = 0x20000
  - UTF-8编码:
		1. 单字节字符: 字节的第一位设为0，后面7位为字符的Unicode码点。因此UTF-8编码和ASCII码是兼容的。
		2. n字节字符(n> 1): 第一个字节的前n位都设为1，第n+1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为字符Unicode码点。

BOM-区别编码方式  
unicode编码：bom(字节序) feff(big(高位在前)) fffe  
utf-8 efbbbf(可以不带)  
utf-16 有bom取bom, 无bom默认feff

[Unicode标准](https://blog.csdn.net/wdeng2011/article/details/80155795)  
[unicode标准详解](https://zhuanlan.zhihu.com/p/165524551)

[字符编码基础](https://blog.csdn.net/softwarenb/article/details/51994943)  
[utf16代理区标准翻译](https://blog.csdn.net/xinbaobaoer/article/details/56290210)  
[Unicode编码表](https://blog.csdn.net/ztf312/article/details/76670356)  
[Unicode编码表中文](https://blog.csdn.net/effort0806222/article/details/51991927)  
[Unicode攻击](https://blog.csdn.net/P5dEyT322JACS/article/details/79454805)  
[正则表达式匹配汉字](https://blog.csdn.net/liuhedong1994/article/details/79204998)  
[汉字范围](https://www.qqxiuzi.cn/zh/hanzi-unicode-bianma.php)

[字符编码系统，字符编码方式(CEF), (CES)区别](https://www.cnblogs.com/benbenalin/p/6915513.html)

***

## URI
URI由URI charcater组成  
URI格式: scheme:string  
通用URI格式: scheme://authority path?query
> authority组件格式: user:password@host:port  
> fragment Identifier: 不属于URI,配合检索使用

### URI character
  - Reserved: :;/?@&=+,$
  - unreserved: 字母 数字 mark  
    > Mark: ()-_!'*~.
  - 转义字符
> 百分号编码(URL编码): 对URI中不允许的字符转为%xx格式  
> encodeURI/decodeURI 按URI格式编码/解码(#不进行编码)  
> encodeURIComponent/decodeURIComponent 按URI组件格式编码/解码

### 两种实现
 - **URN: 通过名字标识 urn:issn:1535-3613**

 - **URL(specific real): 通过定位标识**
    #### 1. data
        data:MIMEtype[;base64],string

### other
  - UTM(流量渠道标记)  
    添加一些广告系列参数用于标记广告信息,用来统计分析
    [UTM](https://www.ichdata.com/traffic-channel-marker-utm.html)

[rfc2396](https://tools.ietf.org/html/rfc2396)  
[url详解](https://www.cnblogs.com/xiaohuochai/p/6144157.html)  
[+-_表示空格](https://blog.csdn.net/qq_36119192/article/details/90348970)  
[淘宝首页使用,同时加载多文件(合并请求)](https://developer.aliyun.com/ask/80984?spm=a2c6h.13159736)  
[!实现DMI(dynamic method invoke/动态方法调用)](https://www.oschina.net/question/130012_21309)  
[app自定义uri](https://bbs.feng.com/read-htm-tid-8941179.html)

***

### MIME类型
全称：多用途互联网邮件扩展（Multipurpose Internet Mail Extensions）
> ###### 和文件扩展名的区别
> 文件扩展名是操作系统中标识文件格式的机制。
	MIME是电子邮件和网络通信中标识信息格式的机制。

mediaType(定义数据的通用类型)/subType(定义数据的特定格式类型)
  - text  
		纯文本(plain text): 不允许formatting commands,处理指令,解释指令和markup(标记)
		> 未知subType, 如果指定charset，作为plain subType， 否则作为application/octet-stream
  - image
  - audio
  - video
  - application  binary数据或由应用处理的数据  
    + octet-stream 主动将数据保存到本地文件
  image,audio,application中未知subType, 作为application/octet-stream

  composite复合类型
  - multipart 包含多种类型的数据
  - message

[mediaType RFC-2046](https://tools.ietf.org/html/rfc2046)

***

#### JSON
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

#### JSON5
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

#### GeoJSON
用于编码各种地理数据结构的格式。
地理坐标系:WGS-84

*** 

#### CSV
一种通用、相对简单的文件格式。
- 格式
1. 以纯文本表示数据
2. 以行为单位，一行数据不换行，无空行。
3. 半角逗号做分隔符。

***


### 参考
1. [JSON官网](http://www.json.org/json-zh.html)
2. [GeoJSON](http://geojson.org/)
3. [既然有文件后缀名,为何还需要MIME类型?](https://www.zhihu.com/question/60495696)
***

<!-- ![by4.0](https://licensebuttons.net/l/by/4.0/88x31.png)   -->
<!-- 本页采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际</a>进行许可。 -->
