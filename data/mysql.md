# MYSQL笔记
## 目录
- [简介](https://github.com/person-0/note/blob/master/data/mysql#简介)
- [用法](https://github.com/person-0/note/blob/master/data/mysql#用法)
- [参考资料](https://github.com/person-0/note/blob/master/data/mysql#参考资料)
***
### 简介
关系型数据库管理系统.
### 用法
#### 数据库操作
- 创建库`CREATE DATABASE IF NOT EXISTS 库名 DEFAULT CHARSET utf8`
- 查看库`SHOW DATABASES`
- 选择库`USE 库名`
- 删除库`DROP DATABASE 库名`
#### 表操作
- 创建表`CREATE TABLE 表名(id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL)`
- 查看库`SHOW TABLES FROM 库名`
- 修改库
1. 添加列
2. 删除列
3. 修改列
- 删除表`DROP TABLE 表名`
#### 记录操作
- 插入记录`INSERT INTO 表名() VALUES() `
- 查看记录
- 修改记录
- 删除记录`DELETE FROM t1 WHERE 条件`
#### 导入
#### 导出
### node使用
***
### 参考资料
1. [mysql教程](http://www.runoob.com/mysql/mysql-tutorial.html)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
