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

进入: `vi 文件名`
退出: `:q!?|:w(q|!)`

#### 切换模式

![切换模式](http://www.runoob.com/wp-content/uploads/2014/07/vim-vi-workmodel.png)

#### move/移动
+ 行间移动
  - 移动至文件第一行`gg`
  - 移动至文件最后一行`G`
  - 移动至文件第n行`nG`(n为数字)
  - 移动至屏幕中第一行`H`
  - 移动至屏幕中中间行`M`
  - 移动至屏幕中最后一行`L`
  - 移动至上一行`-`
  - 移动至下一行`+`
  - 向下移动n行`n<enter>`(n为数字)

+ 行内
  - 至行头`0`
  - 至行尾`$`
  - 至当前位置后n个字符处`n<空格键>`(n为数字)
  - 至下一个单词开头`w`
  - 至上一个单词开头`b`

+ 方向
  - 向上`nk`(n为移动行列数)
  - 向下`nj`
  - 向左`nh`
  - 向右`nl`

+ z
  - cursor line center `zz`
  - cursor line top `z`+`enter`
  - cursor line bottom `z`+`-`


#### find/查找

- 向下 `/查找内容`
- 向上 `?查找内容`
- 继续按之前规则 `n`
- 反向 `N`

#### replace/替换

- 替换当前行中的第一个 `:s/原值/新值/`
- 替换当前行中所有 `:s/原值/新值/g`
- 替换第n行之后每行的第一个 `:n,$s/原值/新值/`
- 替换第n行之后所有 `:n,$s/原值/新值/g`
- 替换当前行之后每行的第一个`:.,$s/原值/新值/`
- 替换当前行之后所有 `:.,$s/原值/新值/g`
- 替换文件每行的第一个 `:%s/原值/新值/`
- 替换文件所有 `:%s/原值/新值/g`
- 替换带/的 `:s#原值/#新值/#`(替换`原值/`为`新值/`)

- `ds char` 't' ds' t
- `cs char char` 't' cs ' " "t"
- `ys motion char` 

1. [vim-surround](https://www.jianshu.com/p/cbfa86c8d8a5)

#### copy/复制/粘贴/剪切/选择/修改
- 在cursor前面进行粘贴, 粘贴后cursor在粘贴第一行 `P`
- 在cursor后面进行粘贴, 粘贴后cursor在粘贴最后一行 `gp`

[vim的寄存器和剪贴簿操作?](https://www.cnblogs.com/bkylee/p/5869332.html)

- 单字符`yl|dl|vl|cl`
> x删除选中字符，X删除前一个字符
> ~切换字符大小写

- 多字符`ynl|dnl|vnl|cnl`（n为字符个数）

- 单词（带单词后的空格）`yw|dw|vw|cw` abc de
- 单词（不带单词后的空格）`ye|de|ve`

- cursor至行首`y0|d0|v0|c0`
- cursor至行尾`y$|d$|v$|c$`
- 当前行`yy|dd||cc`
- 多行`nyy|np|ndd|ncc`（n为行数）

- 指定范围 `y|d|v  i|a|t|f  {|(|[|'|"|<`
  1. i: 对符号内的内容进行操作
  2. a: 对包括符号在内的内容进行操作
  3. t: 所在位置到指定位置进行操作
  4. f: 所在位置到指定位置进行操作(包括指定位置)
 

[detail](https://www.cnblogs.com/bkylee/p/5903343.html)

+ 多内容复制/粘贴/剪切
`(复制/剪切的内容保存在vim寄存器中)`  
  - 查看vim寄存器中内容`:reg`
  - 复制/粘贴/剪切单字符`"标识符yl/"标识符p/"标识符dl`(标识符可为0-9，a-z， 其他复制/粘贴/剪切一样)
  - 选择缓冲区：鼠标，键盘选择内容时，内容存在选择缓冲区中。`"*p`
  - 剪切板：进行Ctrl + c或点击复制时，内容存在剪切板。`"+p`

### macro宏
`按q + 任意键后,开始记录操作, 按q停止记录, 按@刚才按的键执行刚才的操作

### baseCommand
`: version` vim相关信息(配置文件信息)
`: echo $vim|$home` 查看变量值

#### file
`:e ~/.vimrc` 编辑文件
`:%!xxd` 查看二进制
> :!command: 执行shell命令command, 若该command需要指定一个文件输入，当前编辑的文件就是指定文件.
> :%!command: 执行shell命令command后输出写入当前文件
> xxd: vim自带的exe程序 2进制转16进制  -r 16进制转回二进制

#### fold
[vim代码折叠功能](https://blog.csdn.net/zcube/article/details/42325741)  
[每日一Vim（15）折叠(fold)](https://blog.csdn.net/lantian___123/article/details/84413044)

#### set
[高亮光标所在的行列](https://www.jianshu.com/p/b8763c23ea64)

#### map
`inoremap jj <esc>`

***

### vimScript
[vimscript](https://www.kancloud.cn/kancloud/learn-vimscript-the-hard-way/49323)

***

### file
`$home/.viminfo` 记录用户操作信息(vim自动生成)
`$home/./vimrc`  记录用户配置信息

***

### plugin
  + vundle(bundle manage)
    1. git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/vundle.vim
    2. config :
          ```vim
            set rtp+=~/.vim/bundle/vundle.vim
            call vundle#begin()
            Plugin 'VundleVim/Vundle.vim'
            Plugin 'elzr/vim-json' "github plugin
            call vundle#end()
          ```
    3. exec command(Plugin(List|install)|Bundle(List))

[Vundle的介绍及安装](https://blog.csdn.net/zhangpower1993/article/details/52184581)  
[plugin set](https://www.cnblogs.com/Justin-lu/articles/vim_plugin.html)
[json plugin](https://github.com/elzr/vim-json)

***

### 参考资料

1. [Linux vi/vim](http://www.runoob.com/linux/linux-vim.html)
2. [在线vim模拟](http://www.atool.org/vim.php)
3. [[转]Vim 复制粘贴探秘](https://www.cnblogs.com/jianyungsun/archive/2011/03/19/1988855.html)
4. [vimcdoc](http://vimcdoc.sourceforge.net/doc/index.html#normal-index)
5. [Vim的终极配置方案](https://blog.csdn.net/amoscykl/article/details/80616688)

***

![by4.0](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
