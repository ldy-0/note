# git使用总结
## 目录：  
[介绍](https://github.com/person-0/test/blob/master/test-git.md#介绍)  
[基本用法](https://github.com/person-0/test/blob/master/test-git.md#基本用法)  1.[基本库操作](https://github.com/person-0/test/blob/master/test-git.md#基本库操作)
  - [配置](https://github.com/person-0/test/blob/master/test-git.md#配置)
  - [创建](https://github.com/person-0/test/blob/master/test-git.md#创建)  
  - [提交](https://github.com/person-0/test/blob/master/test-git.md#提交)
  - [查看](https://github.com/person-0/test/blob/master/test-git.md#查看)
  - [更改](https://github.com/person-0/test/blob/master/test-git.md#更改)
  - [撤销和删除](https://github.com/person-0/test/blob/master/test-git.md#撤销和删除)
2.[基本分支操作](https://github.com/person-0/test/blob/master/test-git.md#基本分支操作)
3.[连接GitHub](https://github.com/person-0/test/blob/master/test-git.md#连接GitHub)
***
## 介绍> Git是一个开源的分布式版本控制系统。
## 基本用法
### 基本库操作
### 配置
#### 配置设置
`git config --global 配置名 值`两个基本配置：1. `git config --global user.name 名字`
2. `git config --global user.email 邮箱(和github一致)`
#### 查看所有配置

`git config --list或简写git config -l`

#### 查看单个配置
`git config 配置名`

***
### 创建
> 工作区：就是你在电脑里能看到的目录。   
#### git库
`git init`(在需要版本控制的文件夹目录下执行命令，文件夹下生成一个.git的文件夹，即创建了git库)
### 提交
#### 添加文件
> 暂存区：一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。 
`git add 文件`
#### 提交
> 版本库：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
`git commit -m 注释`
***
### 查看
#### 查看状态
`git status`
#### 查看更改信息
`git diff 文件`
#### 查看历史版本
`git log`
#### 查看版本号
`git reflog`
***
### 回退
#### 回退至以前版本
- `git reset --hard HEAD~数字`(代表回退几个版本,如:2为回退至上上个版本)
- `git reset --hard HEAD^`(回退至上个版本,^的个数表示回退几个版本)
#### 回退至相对当前版本(v1.1)之后的版本(v1.2)(之前进行了git reset --hard HEAD~数字)
`git reset --hard 版本号`(版本号可通过git reflog得到)
***
### 撤销和删除
#### 撤销操作
git checkout -- 文件(1.文件未add,撤销至修改前的状态2.文件已add,撤销至add时的状态)
#### 删除
1. 执行删除操作
- `rm 文件`
- `git rm 文件`
2. 确认删除操作
- 提交删除 `git commit -m 注释`
- 撤销删除 `git checkout -- 文件`
***
### 基本分支操作
#### 创建分支
`git branch 分支名字`
#### 查看分支
`git branch`
#### 删除分支
`git branch -d 分支名字`(删除时必须在其他分支下)
#### 切换分支
`git checkout 分支名字`
#### 创建并切换至新建分支
`git checkout -b 分支名字`
#### 合并分支
`git merge 分支名字`(merge命令后面的分支合并至当前分支，在master分支下执行git merge branch 即branch分支合并到master分支)
***
### 连接github
#### 1.上传本地库
##### 生成密钥对
> `ssh-keygen -t rsa -C 邮箱`(邮箱和github注册的一致。)
##### github添加公钥
##### 测试是否可连接
`ssh -T git@github.com`
##### github创建库
##### 本地库连接github库
`git remote add origin git@github.com:github用户名/库名.git`(本地库名和github库名需一致。) 
##### 本地库提交至github库(多次提交可复用连接，直接提交即可。)
`git push -u origin master`
#### 2.下载github上的库
``
