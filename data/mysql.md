# MYSQL笔记
## 目录
- [简介](https://github.com/person-0/note/blob/master/data/mysql.md#简介)
- [用法](https://github.com/person-0/note/blob/master/data/mysql.md#用法)
- [参考资料](https://github.com/person-0/note/blob/master/data/mysql.md#参考资料)
***
### 简介
关系型数据库管理系统（RDBMS）。
### 用法
#### 数据库操作
- 创建库`CREATE DATABASE IF NOT EXISTS 库名 DEFAULT CHARSET utf8`
- 查看库`SHOW DATABASES`
- 选择库`USE 库名`
- 删除库`DROP DATABASE 库名`
#### 表操作
- 创建表`CREATE TABLE 表名(id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL)`
- 查看表`SHOW TABLES FROM 库名`
- 修改表
1. 添加列`ALTER TABLE 表名 ADD 字段名 类型`
2. 删除列`ALTER TABLE 表名 DORP 字段名 类型`
3. 修改列`ALTER TABLE 表名 CHANGE 原字段名 新字段名 类型 （BEFORE/AFTER 字段名）`
- 删除表`DROP TABLE 表名`
#### 记录操作
- 插入记录`INSERT INTO 表名() VALUES() `
- 查看记录
1. 排序`SELECT * FROM 表名 ORDER BY 字段名 ASC/DESC`
2. 正则`SELECT * FROM 表名 WHERE 字段名 REGEXP '正则'`
3. limit`SELECT * FROM 表名 LIMIT 数字`
4. 空值判断`SELECT * FROM WHERE 表名 IS NULL/NOT NULL`
5. 函数count/concat
- 修改记录`UPDATE 表名 SET 字段名=值，字段名=值 WHERE 条件`
- 删除记录`DELETE FROM t1 WHERE 条件`
#### 导入
- 导入数据库`mysql -u 用户名 -p 库名 < 目录/文件名.sql`(库名必须存在，名字可以不一致)
> powershell中会报错（不要在powershell中使用，也不要用powershell导出的sql文件）
#### 导出
- 导出数据库`mysqldump -u 用户名 -p 库名 > 目录/文件名.sql`
### node使用
***
### 参考资料
1. [mysql教程](http://www.runoob.com/mysql/mysql-tutorial.html)
2. [mysql导出](http://database.51cto.com/art/201006/204561.htm)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
