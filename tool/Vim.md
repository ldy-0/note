# Vim笔记
***
## 目录
- [简介](https://github.com/person-0/note/blob/master/tool/Vim.md#简介)
- [用法](https://github.com/person-0/note/blob/master/tool/Vim.md#用法)
- [参考资料](https://github.com/person-0/note/blob/master/tool/Vim.md#参考资料)
***
### 简介
文本编辑器。
- 命令模式
用户刚刚启动 vi/vim，便进入了命令模式。
此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。
- 插入模式
该模式下可以修改文件。
- 底线命令模式
可以使用更多的指令。
### 用法
进入文件`vi 文件名`
#### 切换模式
![切换模式](http://www.runoob.com/wp-content/uploads/2014/07/vim-vi-workmodel.png)
#### 光标
##### 移动
- 移动至文件第一行`gg`
- 移动至文件最后一行`G`
- 移动至文件第n行`nG`(n为数字)
- 移动至屏幕中第一行`H`
- 移动至屏幕中中间行`M`
- 移动至屏幕中最后一行`L`
- 移动至上一行`-`
- 移动至下一行`+`
- 向下移动n行`n<enter>`(n为数字)
- 移动至行头`0`
- 移动至行尾`$`
- 移动至当前位置后n个字符处`n<空格键>`(n为数字)
##### 查找
- 向下查找`/查找内容`
- 向上查找`?查找内容`
- 继续按之前规则查找`n`
- 反向查找`N`
##### 复制/粘贴/剪切
- 复制/粘贴/剪切单字符`yl/p/dl`
- 复制/粘贴/剪切多字符`ynl/p/dnl`（n为字符个数）
- 复制/粘贴/剪切单词（带单词后的空格）`yw/p/dw`
- 复制/粘贴/剪切单词（不带单词后的空格）`ye/p/de`
- 复制/粘贴/剪切至行尾`y$/p/d$`
- 复制/粘贴/剪切至行首`y0/p/d0`
- 复制/粘贴/剪切当前行`yy/p/dd`
- 复制/粘贴/剪切多行`nyy/np/ndd`（n为行数）
### 参考资料
1. [Linux vi/vim](http://www.runoob.com/linux/linux-vim.html)
2. []()
***
![by4.0](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
