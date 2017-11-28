# 编程原则笔记
## 目录
+ [基本原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#基本原则)
  - [单一职责原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#单一职责原则)
  - [开闭原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#开闭原则)
  - [里式替换原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#里式替换原则)
+ [设计风格](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#设计风格)
+ [设计模式](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#设计模式)  
  - [创建型模式](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#创建型模式)  
  - [结构型模式](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#结构型模式)  
  - [行为型模式](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#行为型模式)
+ [注意事项](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#注意事项)
+ [参考资料](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#参考资料)
***
### 基本原则
#### 单一职责原则
简称（srp）
引起一个类变化的原因只有一个。
***
#### 开闭原则
简称（ocp）
对扩展开放，对修改关闭。
***
#### 里式替换原则
简称（lsp）
凡是父类能出现的地方，子类一定能出现。
***
### 设计风格
- RESTful API
采用REST风格设计的API。
> 不适合**高安全性可靠性应用**
1. URL定位资源（名词）
2. HTTP动词描述操作
3. HTTP状态码描述结果
4. 资源多重表述
资源有多种表现形式（如HTML，JSON，XML），请求端和服务器传输资源的特定表述。
5. 无状态通信
并不是要求应用无状态，而是要求状态要么被放入资源状态中，要么保存在客户端上。
***
### 设计模式
#### 创建型模式
- 工厂模式
提供了一种创建对象的方式。
> 1. 屏蔽对象的具体实现。 
> 2. 扩展性高。 
```javascript
function CarFactory(){
  let car = {
    //一些属性，方法
  };
  return car;
}
```
#### 结构型模式
解决对象之间的关系。
- 织入模式
提供能够被子类简单继承功能的类。
> JavaScript没有接口，也不支持纯虚函数，所以通过织入目标类（Mixin）分解功能和扩展功能。如DOM中的HTMLDocument，ParentNode等都是Mixin。
#### 行为型模式
***
### 注意事项
#### Don’t repeat yourself
避免重复。
#### Keep It Simple and Stupid
简单是软件设计的目标。
#### Don’t make me think
代码一定要易于读易于理解。
***
## 参考资料
1. [编程原则](https://jingyan.baidu.com/article/75ab0bcbfb2670d6864db219.html)
2. [深入浅出REST](http://www.infoq.com/cn/articles/rest-introduction/)
3. [怎样用通俗的语言解释REST，以及RESTful？-知乎](https://www.zhihu.com/question/28557115)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
