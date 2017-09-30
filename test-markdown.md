# markdown使用笔记
## 目录
### 内容  
  [字体](https://github.com/person-0/test/blob/master/test-markdown.md#字体)  
  [代码](https://github.com/person-0/test/blob/master/test-markdown.md#代码)  
  [标题](https://github.com/person-0/test/blob/master/test-markdown.md#标题)  
  [链接和图片](https://github.com/person-0/test/blob/master/test-markdown.md#链接和图片)
### 结构  
  [列表](https://github.com/person-0/test/blob/master/test-markdown.md#列表)  
  [表格](https://github.com/person-0/test/blob/master/test-markdown.md#表格)
### 辅助  
  [换行](https://github.com/person-0/test/blob/master/test-markdown.md#换行)  
  [转义](https://github.com/person-0/test/blob/master/test-markdown.md#转义)  
  [分割线](https://github.com/person-0/test/blob/master/test-markdown.md#分割线)
***
### 字体
#### 斜体
> 代码: `*文字*` 效果：*斜体*
#### 粗体
> 代码: `**文字**` 效果：**粗体**
#### 脚注
> 代码: `[^ 文字]` 效果：[^ 脚注]
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
### 引用
> 代码: `> 引用的内容` 效果如下：
> 引用（blockquotes）
> 第一行
  <a>aaaaaaaa</a>
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
