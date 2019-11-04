# git使用笔记

## 目录：  
#### [简介](https://github.com/person-0/note/blob/master/tool/Git.md#介绍)  
#### [用法](https://github.com/person-0/note/blob/master/tool/Git.md#基本用法)  
+ [基本库操作](https://github.com/person-0/note/blob/master/tool/Git.md#基本库操作)
  - [创建](https://github.com/person-0/note/blob/master/tool/Git.md#创建)  
  - [配置](https://github.com/person-0/note/blob/master/tool/Git.md#配置)
  - [更新](https://github.com/person-0/note/blob/master/tool/Git.md#更新)
  - [查看](https://github.com/person-0/note/blob/master/tool/Git.md#查看)
  - [回退](https://github.com/person-0/note/blob/master/tool/Git.md#回退)
  - [撤销和删除](https://github.com/person-0/note/blob/master/tool/Git.md#撤销和删除)  
+ [基本分支操作](https://github.com/person-0/note/blob/master/tool/Git.md#基本分支操作)  
+ [连接远程库](https://github.com/person-0/note/blob/master/tool/Git.md#连接远程库)
+ [查看远程库](https://github.com/person-0/note/blob/master/tool/Git.md#查看远程库)
+ [获取远程库](https://github.com/person-0/note/blob/master/tool/Git.md#获取远程库)
#### [错误](https://github.com/person-0/note/blob/master/tool/Git.md#常见错误)   
+ [推送错误](https://github.com/person-0/note/blob/master/tool/Git.md#推送错误)
#### [解析](https://github.com/person-0/note/blob/master/tool/Git.md#解析)
#### [参考](https://github.com/person-0/note/blob/master/tool/Git.md#参考资料)

***

## 介绍
Git是一个开源的**分布式**版本控制系统。
> - 性能好
> - 扩展性强、稳定性高(分布式)
> Git 有三种状态，你的文件可能处于其中之一：已提交（committed）、已修改（modified）和已暂存（staged）。 
> 已提交: 数据已经安全的保存在本地数据库中。 
> 已暂存: 表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
> 已修改: 修改了文件，但还没保存到数据库中。 

[快照与备份](https://www.jianshu.com/p/74007799313d)

## 基本用法(version: 2.*)

### 创建
`git init`
> 进入需要版本控制的文件夹目录下，执行命令，文件夹下生成一个.git的文件夹，即创建了git库。

##### 概念
> **工作区**：即在电脑里看到的目录（文件夹）。  
**版本库**：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。  
**暂存区**：一般是存放在.git目录下的index文件（.git/index）中，所以有时也叫作索引（index）。

##### 暂存区
`git add 文件`（指定内容更新至暂存区）
- `git add a*b 文件名以a开头，以b结尾的文件`
- `git add -u(--update)`  根目录中所有tracked files（修改或删除操作，**不包括新建未add的文件**）
- `git add *`   当前目录中所有修改（除删除操作）的文件（子目录所有修改文件（包括删除操作））
- `git add -A 从根目录起所有修改的文件 (all tracked and untracked files) `
  > git add . 从所在目录起, 是git add -A(--all/--no-ignore-removal) __dirname 
  > git add --no-all(--no-ignore-removal) <pathspec> 指定目录下所有修改文件(除删除操作)
- `git add -f 添加被忽略的文件`
- `git add -i 查看所有修改的追踪文件修改信息`

##### 提交
提交相当于对暂存区域做一次快照。
`git commit -a(所有已追踪文件) -m 注释`
`git commit -m 注释`
`git commit --amend 修改当前提交信息(修正提交2.已暂存文件变为已提交 1.修改提交信息)`

***

#### config
+ 添加配置 `git config --system/global/local 配置名 值`
> 两个基本配置：
> 1. `git config --global user.name 名字`
> 2. `git config --global user.email 邮箱(和github一致)`

+ 查看所有配置 `git config --list或简写git config -l`
+ 查看系统级配置 `git config --system --list或简写git config -l`
+ 查看用户级配置 `git config --global --list或简写git config -l(配置文件在用户根目录.gitconfig)`
+ 查看库级配置 `git config --local --list或简写git config -l`

+ 添加配置项 `git config --add sectionName.keyName value (简写git config sectionName.keyName value)`
+ 查看配置项 `git config --get sectionName.keyName (简写git config sectionName.keyName)`
+ 删除配置项 `git config --unset sectionName.keyName`
+ 重命名/删除section `git config --rename/remove-section sectionName`

##### Error
1. git config testName 'a'  
    > error: key does not contain a section: testName  
    > 解决：testName 改为 test.name(键名必须有.)

***

#### 查看
##### 查看状态
`git status -s(--short)`
> MM 左边M表示文件状态为已暂存,右边M表示文件状态为已修改
> ?? 未track文件
##### 查看更改信息
`git diff 文件`
##### 查看提交历史
`git log`

|----|----|
|-p|每次提交的内容差异
|--stat|统计信息|
|--pretty|显示格式|
|--graph||

##### 查看版本号
`git reflog`
***

#### 回退
##### 回退至以前版本
- `git reset --hard HEAD~数字`(代表回退几个版本,如:2为回退至上上个版本)
- `git reset --hard HEAD^`(回退至上个版本,^的个数表示回退几个版本)
##### 回退至相对当前版本(v1.1)之后的版本(v1.2)(因为之前进行了git reset --hard HEAD~数字)
`git reset --hard 版本号`(版本号可通过git reflog得到)
`git reset --hard origin/branch` 强制使用远程分支覆盖本地分支
***

#### 移动
`git mv 原文件名 新文件名`
> 1.mv 原文件名 新文件名
> 2.git rm 原文件名
> 3.git add 新文件名

#### 删除
1. 执行删除操作
- `rm 文件(删除工作区文件,暂存区文件未删)`
- `git rm 文件(删除工作区和暂存区文件)`
- `git rm --cached 文件名(代表仅删除暂存区文件)`  
> 文件夹`git rm -r --cached 文件夹`
2. 确认删除操作
- 确认删除 `git commit -m 注释`
- 撤销删除 `git checkout -- 文件`

***

#### checkout
`更新工作区`
`git checkout <commit> 更新工作区内容为指定<commit>`
`git checkout <commit> -- 文件 更新工作区中指定文件内容为指定<commit>`
> `git checkout <commit> . .表示所有文件`
`git checkout -- 文件 更新工作区指定文件内容为暂存区`
> `git checkout . .表示所有文件`
<!-- > 1.文件修改后**未进行'git add'操作**,撤销至修改前的状态   -->
<!-- > 2.文件修改后**已进行'git add'操作**,撤销至'git add'**后**的状态 -->
`git checkout --orphan <branch_name> 创建<branch_name>分支，所有文件均为未添加状态,更新工作区`
[如何清空一个 Git 分支的所有 Commits](https://segmentfault.com/a/1190000012689376)

***

#### 基本分支操作
> `本质是一个可变指针，指向一个提交对象(远程分支不可变)`
##### 创建分支
`git branch 分支名字 branchName|tagName|提交对象hash`
##### 查看分支
`git branch (-l)(本地分支)`  
`git branch -r(远程分支)`  
`git branch -a(所有分支)`
##### 删除分支
`git branch -d 分支名字`(删除时必须在**其他分支下**)
##### 切换分支
`git checkout 分支名字`
##### 创建并切换至新建分支
`git checkout -b 分支名字`
##### 合并分支
`git merge 分支名字`(merge命令后面的分支合并至当前分支，如：在master分支下执行git merge branch 即branch分支合并到master分支)
> 1. 快进(fast forward) 一个分支指向的提交对象是另一个分支指向的提交对象的直接祖先
> 2. 无冲突合并 自动创建包含合并结果的提交对象  

[Git命令之git branch](http://blog.chinaunix.net/uid-23062171-id-3836606.html)

***

#### credential
> `cache 内存存储 `  
> `store [--file] 磁盘存储, 文件默认存储路径:$home/.git-credentials`  
> `manager 托管至window凭证管理器`  

[Git 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)

#### 连接远程库
- 上传本地库
1. 生成密钥对  
`ssh-keygen -t rsa -C 邮箱`(邮箱和github注册的一致。)
2. github添加公钥（详细操作见GitHub使用总结）
3. 测试是否可连接  
`ssh -T git@github.com`
4. github创建库（详细操作见GitHub使用总结）
5. 本地库连接github库  
`git remote add origin git@github.com:github用户名/库名.git`(本地库名和github库名需一致。) 
6. 本地库提交至github库(只要本地库更新后，直接提交即可。)  
`git push -u origin master`

#### 下载远程库  
http protocol: https://github.com/github用户名/库名
git protocol: git@github.com:github用户名/库名
`git clone url path`
> 1. 指定path目录下(没有未指定path，默认为当前目录下)create folder(文件夹名是path最后一级||库名), 
> 2. create .git folder
> 3. data -> .git folder
> 4. init file  via .git folder

#### 查看远程库
##### 查看本地已存在的远程库
`git remote`
> origin是一个标识（名字）标识git为你默认创建的远程代码库。

##### 查看远程库详细信息
`git remote -v`
##### 添加远程库信息
`git remote add origin 远程库url`
##### 修改远程库信息
`git remote set-url origin 新远程库url`
##### 删除远程库信息
`git remote rm origin`

#### remote 
##### 更新本地的远程分支
`git fetch origin`
`git fetch origin master`（合并命令：`git merge origin/master`）
***

#### stash

[git stash](https://www.jianshu.com/p/14afc9916dcb)

***

#### tool
[tig](https://www.jianshu.com/p/d9f60c0abbf7)

***

## 常见错误
### 推送错误

##### 错误命令

- `git push -u origin master`
##### 1. 错误：
![pusherr1](https://github.com/person-0/images/blob/master/git/error/pusherr1.PNG)
###### 原因：
修改内容未提交
###### 解决：
先`git add`，然后`git commit`再`git push`  
##### 2. 错误：
![pusherr2](https://github.com/person-0/images/blob/master/git/error/pusherr2.PNG)
###### 原因：
远程库被修改,本地库和远程库不一致
###### 解决：
先下载远程库的更新`git fetch origin master`
然后合并至本地库`git merge origin/master`
再`git push`
##### 3. 错误：
![pusherr3](https://github.com/person-0/images/blob/master/git/error/pusherr3.PNG)
###### 原因：
空目录不能提交，必须有文件。
###### 解决：
创建文件(如README.md),然后add,commit,最后push
##### 4. 错误：
![pusherr4](https://github.com/person-0/images/blob/master/git/error/pusherr4.PNG)
###### 原因：
。
###### 解决：
`git push -f`

- `git push :branchName`
##### 1. 错误: By default, deleting the current branch is denied, because the next
##### 原因: 远程分支为master分支(默认分支)
##### 解决: 设置其他分支为master分支(默认分支)

###### 
> 错误：HTTP Basic: Access denied
> 原因: 账号密码没有权限
> 解决：修改账号密码

***

### 解析
> git核心为kvDB
> tree-object 记录文件与blob对象key映射关系(解决文件名保存)
> commit 记录tree的创建人，创建时间，描述信息

#### git hash-object [-t 'blob'] [-w] <file>
计算/输出对象hash值,并且可以选择存储对象
[hash-object](http://web.mit.edu/~mkgray/project/silk/root/afs/sipb/project/git/git-doc/git-hash-object.html)

#### git cat-file (-p | -s | -t) 键值
查看键值对应内容,大小，类型

#### git update-index 
register to the index
`--add 文件`将文件更新至暂存区(如果文件还没有被存储，存储文件, 如果暂存区已有文件，覆盖)
`--cacheinfo 文件类型，文件键值，文件路径` 添加内容至暂存区

#### git write-tree
根据当前暂存区创建tree(一个文件夹为一个tree-object)

#### git commit-tree 键值 [-p 父键值] [-m desc] [-F desc文件路径]
根据tree创建提交对象

#### git update-ref <ref> <value>
创建引用(refs)

- <ref>: HEAD|refs/heads/引用名
- <value>: commit对象Key

***

### 参考资料

1. [关于origin的解释](https://www.zhihu.com/question/27712995/answer/39946123)
2. [Git 常见问题整理](http://www.open-open.com/lib/view/open1366080269265.html)
3. [git rm 和 rm 区别](https://yang3wei.github.io/blog/2013/02/03/git-rm-he-rm-de-qu-bie/)
4. [git强制和远程仓库保持一致，强制用远程仓库覆盖本地代码](https://blog.csdn.net/veloi/article/details/86217650)
5. [如何切换多个GitHub账号](https://www.jianshu.com/p/0ad3d88c51f4)
6. [Git中文开发手册](https://www.php.cn/manual/view/35109.html)

***

![署名](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
