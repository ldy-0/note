# Less笔记
## 目录
- [简介](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#简介)
- [基础用法](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#基础用法)  
  + [变量](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#变量)
  + [Mixin](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/Less.md#mixin)
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
- 普通Mixin
```less
.class{
  color: red;
}
.class1(@bg: green){
  background: @bg;
}
.class2{
  .class;
  .class1();
}
```
- 不输出Mixin
```less
.class(){
  color: red;
}
.class1{
  background: green;
}
.class2{
  .class;
  .class();
}
//编译后
.class1{
  background: green;
}
.class2{
  color: red;
  background: green;
}
```
- 嵌套Mixin
```less
.class(){
  &:hover{
    color: red;
  }
}
.class2{
  .class;
}
//编译后
.class2:hover{
  color: red;
}
```
- 带命名空间Mixin
```less
.class{
  .class1{
    color: red;
  }
}
.class2{
  .class > .class1;
}
//编译后
.class2{
  color: red;
}
```
- 带!important的Mixin
```less
.class{
  color: red;
}
.class2{
  .class !important;
}
//编译后
.class2{
  color: red !important;
}
```
***
参考文献
1. [Less](http://www.runoob.com/manual/lessguide/features/#features-overview-feature-variables)
