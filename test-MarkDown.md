# markdown使用笔记
## 目录
- [内容](https://github.com/person-0/test/blob/master/test-MarkDown.md#内容)  
  + [字体](https://github.com/person-0/test/blob/master/test-MarkDown.md#字体)  
  + [代码](https://github.com/person-0/test/blob/master/test-MarkDown.md#代码)  
  + [标题](https://github.com/person-0/test/blob/master/test-MarkDown.md#标题)  
  + [引用](https://github.com/person-0/test/blob/master/test-MarkDown.md#引用)  
  + [链接](https://github.com/person-0/test/blob/master/test-MarkDown.md#链接)  
  + [图片](https://github.com/person-0/test/blob/master/test-MarkDown.md#图片)
- [结构](https://github.com/person-0/test/blob/master/test-MarkDown.md#结构)  
  + [列表](https://github.com/person-0/test/blob/master/test-MarkDown.md#列表)  
  + [表格](https://github.com/person-0/test/blob/master/test-MarkDown.md#表格)
- [辅助](https://github.com/person-0/test/blob/master/test-MarkDown.md#辅助)
  + [空格](https://github.com/person-0/test/blob/master/test-MarkDown.md#空格)
  + [换行](https://github.com/person-0/test/blob/master/test-MarkDown.md#换行)  
  + [转义](https://github.com/person-0/test/blob/master/test-MarkDown.md#转义)  
  + [分割线](https://github.com/person-0/test/blob/master/test-MarkDown.md#分割线)  
- [扩展](https://github.com/person-0/test/blob/master/test-MarkDown.md#扩展)
  + [内嵌HTML](https://github.com/person-0/test/blob/master/test-MarkDown.md#内嵌HTML)
***
### 内容
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
\`内容\` 效果：`内容`
***
#### 标题
`# 标题名` 效果如下：
# 一级标题
`## 标题名` 效果如下：
## 二级标题
`###### 标题名` 效果如下：
###### 六级标题
#### 引用
`> 引用的内容`  
效果如下：
> 引用的内容
***
#### 链接
- 内联式
> 代码: `[链接名字](链接地址)`
效果：[person-0](http://github.com/person-0)
- 引用式
> 代码: `[链接名][索引值] [索引值]: https://github.com/person-0/`(注意空格处换行)
效果: [person-0][1]  

[1]: https://github.com/person-0 "mygithub"
***
#### 图片
- 内联式
> 代码: `![图片名字](图片地址)`
效果：![mou](http://mouapp.com/Mou_128.png)
- 引用式
> 代码: `![图片名][索引值] [索引值]: https://github.com/person-0/`(注意空格处换行)
效果: ![m][2]  

[2]: http://mouapp.com/Mou_128.png "mou"
***
###  结构
#### 列表
##### 无序列表（两种方式）
`\- 列表内容 或 \+ 列表内容`(注意空格)
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
>   
\|   第一列标题   \|   第二列标题  \|   第三列标题  \|  
\|---------------\|--------------\|--------------\|  
\|第一行第一列内容\|第一行第二列内容\|第一行第三列内容\|  
  
效果如下：  

|col 1|col 2| col 3|
|-----|-----|------|
|row 1|row 1| row 1|
***
### 辅助
#### 空格
> 操作: `切换至全角(一般为：shift+空格)再敲空格` 效果如下:
a　b
***
#### 换行
> 操作: `敲两下空格再敲回车` 效果如下:  
第一行  
第二行
***
#### 转义
> 代码：`\待转字符` （与其他语言用法一致）
***
#### 分割线
> 代码: `***` 效果：
***
### 内嵌HTML
#### 单个
> 代码: `<标签></标签>` 效果：  
<a href="#">a</a>
#### 整个预格式化代码块（代码块从新的一行开始）
> 代码:  
<标签></标签>  
<标签></标签>  
效果：  
<ul>  
 <li>1</li>  
 <li>2</li>  
</ul>
