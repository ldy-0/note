# markdown使用笔记
## 目录
### 内容  
  1.[字体](https://github.com/person-0/test/blob/master/test-markdown.md#字体)  
  2,[代码](https://github.com/person-0/test/blob/master/test-markdown.md#代码)  
  3.[标题](https://github.com/person-0/test/blob/master/test-markdown.md#标题)  
  4.[引用](https://github.com/person-0/test/blob/master/test-markdown.md#引用)  
  5.[链接和图片](https://github.com/person-0/test/blob/master/test-markdown.md#链接和图片)
### 结构  
  1.[列表](https://github.com/person-0/test/blob/master/test-markdown.md#列表)  
  2.[表格](https://github.com/person-0/test/blob/master/test-markdown.md#表格)
### 辅助  
  1.[空格](https://github.com/person-0/test/blob/master/test-markdown.md#空格)
  2.[换行](https://github.com/person-0/test/blob/master/test-markdown.md#换行)  
  3.[转义](https://github.com/person-0/test/blob/master/test-markdown.md#转义)  
  4.[分割线](https://github.com/person-0/test/blob/master/test-markdown.md#分割线)  
### 扩展  
  1.[内嵌HTML](https://github.com/person-0/test/blob/master/test-markdown.md#内嵌HTML)
***
### 字体
#### 斜体
> 代码: `*文字*` 效果：*斜体*
#### 粗体
> 代码: `**文字**` 效果：**粗体**
#### 脚注
> 代码: `[^文字]` 效果：[^脚注]  
  
 [^脚注]: https:www.github.com/person-0
***
### 代码
> 代码: \`内容\` 效果：`code`
***
### 标题
> 代码: `# 标题名` 效果如下：
# 一级标题
> 代码: `## 标题名` 效果如下：
## 二级标题
> 代码: `###### 标题名` 效果如下：
###### 六级标题
***
### 引用
> 代码: `> 引用的内容` 效果如下：
> 引用（blockquotes）
> 第一行
***
### 链接和图片
#### 链接
- 内联式
> 代码: `[链接名字](链接地址)`
效果：[github](http://github.com)
- 引用式
> 代码: `[链接名][索引值] [索引值]: https://github.com/person-0/`
效果: [person-0][1]  

[1]: https://github.com/person-0 "mygithub"
#### 图片
- 内联式
> 代码: `![图片名字](图片地址)`
效果：![mou](http://mouapp.com/Mou_128.png)
- 引用式
> 代码: `![图片名][索引值] [索引值]: https://github.com/person-0/(注意空格处换行)`
效果: ![person-0][1]  

[1]: https://github.com/person-0 "mygithub"
***
### 列表
#### 无序列表（两种方式）
> 代码:  `- 列表内容` 或 `+ 列表内容` 效果:
- ul-1
- ul-2
- ul-3
#### 有序列表
> 代码: `1. 列表内容` 效果:
1. ol-1
2. ol-2
3. ol-3
***
### 表格
>   
\|   第一列标题   \|   第二列标题  \|   第三列标题  \|  
\|---------------\|--------------\|--------------\|  
\|第一行第一列内容\|第一行第二列内容\|第一行第三列内容\|  
  
效果如下：  

|col 1|col 2| col 3|
|-----|-----|------|
|row 1|row 1| row 1|
***
### 空格
> 操作: `切换至全角(一般为：shift+空格)再敲空格` 效果如下:
a　b
***
### 换行
> 操作: `敲两下空格再敲回车` 效果如下:  
第一行  
第二行
***
### 转义
> 代码：`\待转字符` （与其他语言用法一致）
***
### 分割线
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
