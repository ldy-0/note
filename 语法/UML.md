# UML笔记
***
## 目录
- [理论基础](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/UML.md#理论基础)  
  + [关系](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/UML.md#关系)
  + [图](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/UML.md#图)
- [参考资料](https://github.com/person-0/note/blob/master/%E8%AF%AD%E6%B3%95/UML.md#参考资料) 
***
### 理论基础
UML(Unified Modeling Language)又称统一建模语言
用于程序设计和分析。
UML由3个要素构成：UML的基本构造块、支配这些构造块如何放置在一起的规则和运用于整个语言的公用机制。
UML有3种基本的构造块：事物、关系和图。
#### 关系
##### 关联
一个对象作为另一个对象的属性，有单向关联，双向关联。`由带箭头的实线表示`
![]()
###### 多重关联
![]()
###### 聚合
局部可以独立于整体而存在。`有空心菱形实线表示`
![]()
###### 组合
局部不能脱离整体而存在。`有实心菱形实线表示`
![]()
##### 依赖
一个对象作为另一个对象方法的参数，局部变量。`由带箭头的虚线表示`
![]()
##### 泛化
`由带空心三角的实线表示`
![]()
##### 实现
`由带空心三角的虚线表示`
![]()
#### 图
##### 用例图
由角色，用例，关系构成。
> 从系统外部对系统功能描述。
- 角色：与系统交互的人或事物。`由小人表示`
- 用例：系统功能的描述。`由椭圆表示，椭圆中有描述信息`
- 关系：角色与用例间的关系。`由箭头实线表示`
##### 静态图
包括类图，包图，对象图。
###### 类图
> 类图是用来描述系统中各事物之间的关系。  
  + 类  
  是对现实世界中一组具有相同特征的物体的抽象。`由矩形表示`
  ![]()
  + 接口  
    是不可实例化的特殊类。
    ![]()
  + 枚举  
    有限数量的文本值。
  ![]()
###### 包图
`由文件夹表示`
> 是对需求或系统的高层概述。
> 导入关系`由带箭头虚线表示`
###### 对象图  
对象是类的具体实例。`由矩形表示`
> 对象图是用来描述系统中参与交互的各个对象在某一时刻是如何运行的。
##### 行为图
包含活动图和状态图。
##### 交互图
包含顺序图和合作图。
##### 实现图

***
参考资料
1. [百度百科](https://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E5%BB%BA%E6%A8%A1%E8%AF%AD%E8%A8%80/3160571?fr=aladdin&fromid=446747&fromtitle=UML)
2. [浅谈UML的概念和模型之UML视图](http://blog.csdn.net/jiuqiyuliang/article/details/8550281)
3. [深入浅出UML类图](http://www.uml.org.cn/oobject/201211231.asp)
4. [UML图之一——用例图](http://blog.csdn.net/wangyongxia921/article/details/8246628)
5. [UML图详解(九）——包图](http://blog.csdn.net/fanxiaobin577328725/article/details/51700528)
6. [类图和对象图详解](http://blog.csdn.net/shan9liang/article/details/6712867)
