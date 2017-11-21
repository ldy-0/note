# markdown使用笔记
## 目录
#### [基本内容](https://github.com/person-0/test/blob/master/MarkDown.md#内容)  
  + [标题](https://github.com/person-0/test/blob/master/MarkDown.md#标题)  
  + [字体](https://github.com/person-0/test/blob/master/MarkDown.md#字体)  
  + [代码](https://github.com/person-0/test/blob/master/MarkDown.md#代码)  
  + [引用](https://github.com/person-0/test/blob/master/MarkDown.md#引用)  
  + [链接](https://github.com/person-0/test/blob/master/MarkDown.md#链接)  
  + [图片](https://github.com/person-0/test/blob/master/MarkDown.md#图片)
#### [基本结构](https://github.com/person-0/test/blob/master/MarkDown.md#结构)  
  + [列表](https://github.com/person-0/test/blob/master/MarkDown.md#列表)  
  + [表格](https://github.com/person-0/test/blob/master/MarkDown.md#表格)
#### [基本辅助](https://github.com/person-0/test/blob/master/MarkDown.md#辅助)
  + [空格](https://github.com/person-0/test/blob/master/MarkDown.md#空格)
  + [换行](https://github.com/person-0/test/blob/master/MarkDown.md#换行)  
  + [转义](https://github.com/person-0/test/blob/master/MarkDown.md#转义)  
  + [分割线](https://github.com/person-0/test/blob/master/MarkDown.md#分割线)  
#### [扩展](https://github.com/person-0/test/blob/master/MarkDown.md#扩展)  
  + [内嵌HTML](https://github.com/person-0/test/blob/master/MarkDown.md#内嵌%48%54%4d%4c)
***
### 内容
#### 标题
`# 标题名` 效果如下：（注意空格）
# 一级标题
`## 标题名` 效果如下：（注意空格）
## 二级标题
`###### 标题名` 效果如下：（注意空格）
###### 六级标题
***
#### 字体
##### 斜体
`*文字*` 效果：*文字*
##### 粗体
`**文字**` 效果：**文字**
##### 脚注
`[^文字]` 效果：[^脚注]  
  
[^脚注]: https:www.github.com/person-0
***
#### 代码
##### 普通显示
\`内容\` 效果：`内容`
##### 代码高亮
\`\`\` javascript  
var i = 0;  
\`\`\` 效果：
```javascript
var i = 0;
```
***
#### 引用
##### 单一引用
\> 引用的内容  
效果如下：
> 引用的内容
##### 嵌套引用
\> 第一层
\>\> 第二层
> 第一层
>> 第二层
***
#### 链接
- 内联式  
`[链接名字](链接地址)`
效果：[person-0](http://github.com/person-0)
- 引用式  
`[链接名][索引值] [索引值]: https://github.com/person-0/`(注意空格处换行)
效果: [person-0][1]  

[1]: https://github.com/person-0 "mygithub"
***
#### 图片
- 内联式  
`![图片名字](图片地址)`
效果：  
![mou](http://mouapp.com/Mou_128.png)
- 引用式  
`![图片名][索引值] [索引值]: https://github.com/person-0/`(注意空格处换行)
效果:   
![m][2]  

[2]: http://mouapp.com/Mou_128.png "mou"
***
###  结构
#### 列表
##### 无序列表（两种方式）
`- 列表内容 或 + 列表内容`(注意空格)
效果:
- 内容-1
- 内容-2
- 内容-3
##### 有序列表
`序号. 列表内容`(注意空格)
1. 内容-1
2. 内容-2
3. 内容-3
***
#### 表格
\|   第一列标题   \|   第二列标题  \|   第三列标题  \|  
\|---------------\|--------------\|--------------\|  
\|第一行第一列内容\|第一行第二列内容\|第一行第三列内容\|  
  
效果如下：  

|第一列标题|第二列标题|第三列标题|
|-----|-----|------|
|第一行第一列内容|第一行第二列内容|第一行第三列内容|
***
### 辅助
#### 空格
`切换至全角(一般为：shift+空格)再敲空格` 效果如下:
a　b
#### 换行
`敲两下空格再敲回车` 效果如下:  
第一行  
第二行
#### 转义
`\待转字符` (想要输出\时，多写一个\。)
#### 分割线
`***` 效果：
***
### 扩展
#### 内嵌HTML
##### 单个标签
`<a>a</a>` 效果：  
<a href="#">a</a>
##### 整个预格式化代码块（代码块从新的一行开始）
`\<ul>
  \<li>1</li>
  \<li>2</li>
\</ul> `
效果：  
<ul>  
 <li>1</li>  
 <li>2</li>  
</ul>

***
![by4.0](https://licensebuttons.net/l/by/4.0/88x31.png)
###### 本页采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际</a>进行许可。
