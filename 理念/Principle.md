# 编程理念-笔记
## 目录
+ [基本原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#基本原则)
  - [单一职责原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#单一职责原则)
  - [开闭原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#开闭原则)
  - [里式替换原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#里式替换原则)  
  - [接口隔离原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#接口隔离原则)  
  - [依赖倒置原则](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#依赖倒置原则)
+ [API设计风格](https://github.com/person-0/note/blob/master/%E7%90%86%E5%BF%B5/Principle.md#设计风格)
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
A class should have only one reason to change
引起一个类变化的原因只有一个。
#### 开闭原则
简称（ocp）
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
软件实体（类，模块，函数等）对扩展开放，对修改关闭。
#### 里式替换原则
简称（lsp）
Subtypes must be substitutable for their base types.
派生类型必须可以替换他的基类型。
凡是父类能出现的地方，子类一定能出现。
#### 接口隔离原则
简称（isp）
Clients should not be forced to depend on methods they do not use.
不应该强制客户端依赖自身不需要的方法。
> 接口：一个对象中声明的所有操作（方法）。
> ###### 与srp区别
> isp针对抽象和整体，srp针对实现和具体。
#### 依赖倒置原则
简称（dip）
1.High-level modules should not depend on low-level modules.  Both should depend on abstractions.
高层模块不应该依赖于底层模块，二者都应该依赖于抽象。
2.Abstractions should not depend upon details.  Details should depend upon abstractions.
抽象不应该依赖细节，细节应该依赖于抽象。
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
##### 单例模式
类只有一个实例。
```javascript
const singleObj = {
  //一些属性，方法
}
```
##### 原型模式
用实例指定创建对象的类型，通过克隆实例创建对象。
```javascript
const prototype = {
  //浅拷贝
  clone(){
    let newObj = {};
    newObj.__proto__ = this.__proto__;
    
    for(let key in this){
      if(this.hasOwnProperty(key)){
        newObj[key] = this[key];  
      }
    }
    return newObj;
  }
};
//原型对象
function Obj(name){
  this.__proto__ = prototype;
  //一些属性方法
  this.name = name;
}

let o = new Obj('o1'),
    oclone = o.clone();
oo.name = 'o2';
```
##### 工厂模式
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
##### 织入模式
提供能够被子类简单继承功能的类。
> JavaScript没有接口，也不支持纯虚函数，所以通过织入目标类（Mixin）分解功能和扩展功能。如DOM中的HTMLDocument，ParentNode等都是Mixin。
#### 行为型模式
##### 观察者模式
发布者发布主题，订阅者订阅主题。
> 发布者无需知道有哪些订阅者，订阅者无需知道发布者，二者解耦，减少关联性。
```javascript
function Observer(){
  this.handles = {};
}
Observer.prototype = {
  on(type, callback){
    if(!handles[type]){
      return handles[type] = [callback];
    }
    
    handles[type].push(callback);
  },
  emit(type){
    for(let i = 0; i<handles[type].length; i++){
      handles[type][i]();
    }
  },
}
```
##### 职责链模式
将负责同一职责的对象连接起来形成链，请求从链头开始传递，直至被处理。
###### 例子
```javascript
let prototype = {
  setNext(next){
    this.next = next;
  }
};
//处理对象1
function Handle100(){
  this.__proto__ = prototype;
  this.next = null; //下一个处理函数的引用
  // 具体逻辑处理
  this.do = function(monay){
    while(monay>=100){
      console.log(`-100`);
      monay -= 100;
    }
        
    return monay === 0 ? void(0) : this.next.do(monay);
  }
}
//处理对象2
function Handle50(){
  this.__proto__ = prototype;
  this.next = null; //下一个处理函数的引用
  // 具体逻辑处理
  this.do = function(monay){
    while(monay>=50){
       console.log(`-50`);
      monay -= 50;
     }
    return monay === 0 ? void(0) : this.next.do(monay) ;
  }
}

let h100 = new Handle100();
let h50 = new Handle50();

h100.setNext(h50);
h50.setNext(null);

h100.do(350);
```
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
2. [设计模式六大原则（4）：接口隔离原则](http://blog.jobbole.com/85537/)
3. [依赖倒置原则](https://www.cnblogs.com/cbf4life/archive/2009/12/15/1624435.html)
4. [深入浅出REST](http://www.infoq.com/cn/articles/rest-introduction/)
5. [怎样用通俗的语言解释REST，以及RESTful？-知乎](https://www.zhihu.com/question/28557115)
6. [单例模式的优缺点和使用场景](http://www.cnblogs.com/damsoft/p/6105122.html)
7. [大话设计模式读书笔记--文章汇总](https://www.cnblogs.com/liuconglin/p/6528129.html)
8. [大话设计模式](http://blog.csdn.net/u014222687/article/category/2683821)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
