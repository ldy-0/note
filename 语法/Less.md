# Less笔记
## 目录
- [简介](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#简介)
- [基础用法](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#基础用法)  
  + [变量](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#变量)
***
### 简介
### 基础用法
#### 变量
- 普通值
```less
//声明
@length：100px;
//使用
.box{
  width: @length;//变量存在优先级，结果为200px；
  height: @length;
  @length: 200px;
}
```
- 选择器/特性/路径
```less
//声明
@d: div;
@bg: background;
@image: './images/';
//使用
@{d}{
  @{bg}: '@{image}a.jpg';
}
```
- 变量名
```less
//声明
@color: green;
@c: 'color';
//使用
body{
  color: @@c;//结果为green
}
```
#### mixin
- 
***
参考文献
1. [Less](http://www.runoob.com/manual/lessguide/features/#features-overview-feature-variables)
