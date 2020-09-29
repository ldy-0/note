# lang

### mark lang(ML)
> text -- upgrade -> rich Text
> 通过标记解释文档内容。

数字字符引用Numeric Character Reference(NCR): 表示指定字符(除控制字符,代理区)的标记结构
&#x3c|&#60(unicode码点)

#### SGML

#### XML

#### HTML
> sgml -> html

命名字符引用Named Character References: 表示不能直接合法使用的字符 &lt
> Html5必须以;结尾

| name | NCR | named | desc |
|------|-----|-------|------|
| 版权符号   | &#169\; | &copy\; | |
| 人民币符号 | &#165\; | &yen\;  | |
| 非中断空格 | &#x0020\; | &ensp\;  | 宽度为中文字符一半 |
| 半角空格   | &#x2002\; | &ensp\;  | 宽度为中文字符一半 |
| 全角空格   | &#x2003\; | &emsp\;  | 宽度为一个中文字符 |

[character reference - TR](https://www.w3.org/TR/2017/REC-html52-20171214/syntax.html#character-references)  
[命名字符引用&lt和&lt\;区别](https://www.zhihu.com/question/274710555)

#### svg
svg片段可以独立作为资源、文件，也可以作为片段嵌入xml、html文档
自包含(self-contained): svg元素可以嵌套另一个svg元素

##### ns
HTML parser自动设置ns
> xmlns: 声明元素所在命名空间
<!-- %3Cpath d=%22起点x坐标 起点y坐标 c水平半径 垂直半径 0 连接方向() 0 %22 stroke=%22%23ff0000%22 /%3E -->
<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
  <path d="M5 0.5 A4 4 0 1 0 9.5 5" stroke="green" stroke-width="1" fill="none" />
</svg>
