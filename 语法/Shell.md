# shell笔记
## 目录
- [介绍](https://github.com/person-0/note/blob/master/Shell.md#介绍)
- [使用](https://github.com/person-0/note/blob/master/Shell.md#使用)
  + [Bash](https://github.com/person-0/note/blob/master/Shell.md#使用)
  + [powershell](https://github.com/person-0/note/blob/master/Shell.md#环境)
***
### 介绍
（注 *本小节部分内容来自百度百科*）
是命令解析器（或称命令终端），是操作系统最外面的一层，shell管理你与操作系统之间的交互。
- GUI shell（图形界面式）  
Windows Explorer
- CLI shell（命令行式）  
bash/sh/ksh/csh/cmd.exe/PowerShell
如果不特别注明，shell一般指命令行式的shell。
#### 主要操作系统下缺省shell:
- AIX下是Korn Shell
- Solaris是Bourne shell
- FreeBSD是C shell
- HP-UX是POSIX shell
- Linux/Mac OS是Bourne Again shell(bash)
- window是cmd/powershell
### 使用
#### bash
##### 目录操作
- 进入子目录
`cd 子目录名`
- 返回上级目录
`cd ..`
- 查看当前目录`ls`
- 查看当前目录文件地址`ls -i`
##### 文件夹操作
- 创建文件夹`mkdir 文件夹名`
- 移动文件夹`mv 文件夹名 新文件夹/新文件名`
- 重命名文件夹`mv 原文件夹名 新文件夹名`
- 删除文件夹`rmdir 文件夹名`
- 删除文件夹及内部内容`rm -rf 文件夹名`（-r代表向下递归删除 -f代表强制删除，无提示）
##### 文件操作
- 创建文件`touch 文件名`
- 删除文件`rm 文件名`
***
#### powershell
###### 环境
##### 目录操作
同上
###### 进入其他盘符
`cd 盘符名:`
##### 文件操作
***
#### 参考资料

***
![署名](https://licensebuttons.net/l/by/4.0/88x31.png)  
本作品采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
