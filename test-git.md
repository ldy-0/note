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
- `git reset --hard HEAD~数字`(代表回退几个版本,如:2为回退至上上个版本)
- `git reset --hard HEAD^`(回退至上个版本,^的个数表示回退几个版本)
### 回退至相对当前版本(v1.1)之后的版本(v1.2)(之前进行了git reset --hard HEAD~数字)
`git reset --hard 版本号`(版本号可通过git reflog得到)
***
## 撤销和删除
### 撤销操作
git checkout -- 文件(1.文件未add,撤销至修改前的状态2.文件已add,撤销至add时的状态)
### 删除
1. 执行删除操作
- `rm 文件`
- `git rm 文件`
2. 确认删除操作
- 提交删除 `git commit -m 注释`
- 撤销删除 `git checkout -- 文件`
***
## 分支
### 创建并切换至新建分支
`git checkout -b 分支名字`
### 切换分支
`git checkout 分支名字`
### 查看分支
`git branch`
### 合并分支
`git merge 分支名字`
### 删除分支
`git branch -d 分支名字`
***
## 远程连接
### 秘钥
`ssh-keygen -t rsa -C 邮箱`
