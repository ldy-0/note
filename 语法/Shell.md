# shell笔记
## 目录
- [介绍](https://github.com/person-0/note/blob/master/语法/Shell.md#介绍)  
- [使用](https://github.com/person-0/note/blob/master/语法/Shell.md#使用)
  + [Bash](https://github.com/person-0/note/blob/master/语法/Shell.md#使用)  
  + [powershell](https://github.com/person-0/note/blob/master/语法/Shell.md#环境)
- [参考资料](https://github.com/person-0/note/blob/master/语法/Shell.md#参考资料)
***
### 介绍
（注 *本小节部分内容来自百度百科*）
是命令解析器（或称命令终端），是操作系统最外面的一层，shell管理你与操作系统之间的交互。
- GUI shell（图形界面式）  
Windows Explorer
- CLI shell（命令行式）  
bash/sh/ksh/csh/cmd/PowerShell
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
`cd 子目录名`(目录名可嵌套，如：`cd a/b`进入当前目录中的a目录下的b目录)
- 返回上级目录
`cd ..`(可嵌套，如：`cd ../..`返回上上级目录)
- 查看目录  
  + 查看当前目录`ls`  
  + 查看当前目录文件地址`ls -i`  
  + 查看当前目录下的子目录`ls a/b`
##### 文件夹操作
- 创建文件夹
  + 创建单个文件夹`mkdir 文件夹名`
  + 创建多层文件夹`mkdir -p 父文件夹/子文件夹`
  + 创建多个同级文件夹`mkdir 文件夹1 文件夹2`
- 移动文件夹`mv 原文件夹/文件夹名 新文件夹/新文件名`
- 重命名文件夹`mv 原文件夹名 新文件夹名`
- 删除文件夹`rmdir 文件夹名`（可嵌套）
> 删除文件夹及内部内容`rm -rf 文件夹名`（-r代表向下递归删除 -f代表强制删除，无提示）
##### 文件操作
- 创建文件`touch 文件名`（可嵌套）
- 重命名文件`mv 原文件名 新文件名`（可嵌套）
- 删除文件`rm 文件名`（可嵌套）
##### 文件内容操作
- 查看文件内容`cat 文件名`（可嵌套）
- 编辑文件内容`vi 文件名`（可嵌套）
***
#### powershell
###### 环境
##### 目录操作
- 进入子目录，返回上级目录（命令和bash一致）
- 进入其他盘符`cd 盘符名:`
- 查看目录
  + 查看当前目录`dir`   
  + 查看当前目录下的子目录`dir a/b`
##### 文件夹操作
创建多个同级文件夹`mkdir 文件夹1,文件夹2`(其他都和bash一致)
##### 文件操作
- 创建文件`new-item 文件名`（可嵌套）(其他都和bash一致)
##### 文件内容操作
- 查看文件内容`get-content 文件名(简写：gc 文件名)`（可嵌套）
- 添加文件内容`add-content 文件名 '内容'(简写：ac 文件名)`（可嵌套）
- 删除文件内容`clear-content 文件名 (简写：clc 文件名)`（可嵌套）
##### 进程操作
- 打开新进程`start-process 该进程运行的文件名`
- 查看所有运行的进程`get-process`
- 关闭进程`stop-process -name '进程名'`([更多用法](http://blog.chinaunix.net/uid-9781829-id-1997735.html))
***
#### 参考资料
1. [Linux命令大全](http://man.linuxde.net/)
***
![署名](https://licensebuttons.net/l/by/4.0/88x31.png)  
本作品采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
