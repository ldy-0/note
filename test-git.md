# 测试git使用
## 建立
### 配置
1. `git config --global user.name 名字`
2. `git config --global user.email 邮箱(和github一致)`
### 文件夹关联git库
`git init`(在文件夹目录下执行命令)
### 添加文件
`git add 文件`
### 提交
`git commit -m 注释`
***
## 查看和更改
### 查看状态
`git status`
### 查看更改信息
`git diff 文件`
### 查看历史版本
`git log`
### 查看版本号
`git reflog`
### 回退至以前版本
-`git reset --hard HEAD~数字`(代表回退几个版本,如:2为回退至上上个版本)
-`git reset --hard HEAD^`(回退至上个版本,^的个数表示回退几个版本)
### 回退至相对当前版本(v1.1)之后的版本(v1.2)(之前进行了git reset --hard HEAD~数字)
`git reset --hard 版本号`(版本号可通过git reflog得到)
