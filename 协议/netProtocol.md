# 网络协议笔记
***
## 目录
- [简介](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#简介)
- [基础理论](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#基础理论)
+ [超文本传输协议](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#超文本传输协议)
- [参考资料](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#参考资料)
***
### 简介
是计算机网络中进行数据交换而建立的规则、标准或约定的集合。（简单来说就是：**网络中所有通信规则的集合**）。
##### 为什么创造它？
###### 问题1：如果你想访问其他计算机上的资源怎么办？
可以通过网络。
###### 问题2：那网络中计算机是怎么通信的？
我们通信是双方共同使用一种语言（汉语，英语），计算机也是这样的，他们就是通过相同的网络协议通信。
###### 问题3：为什么要分层呢？
1. 整个网络太复杂，所以需要分解成若干个相对分离的问题，然后再连接起来。
2. 为了工程上实现，调试，维护方便。
##### 分层模型
- OSI/RM模型  
![7](https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268/sign=101875a4033b5bb5bed727f80ed3d523/adaf2edda3cc7cd9b53c40d63901213fb80e91af.jpg)  
（注 *本图片来自百度百科*）
- TCP/IP模型
![5](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=afdb20bf8a13632701e0ca61f0e6cb89/f31fbe096b63f624d56485608744ebf81a4ca39c.jpg)
（注 *本图片来自百度百科*）
### 基础理论
#### 应用层
##### 超文本传输协议
用于从服务器传输超文本到本地浏览器的网络传输协议。（简称HTTP，默认端口号80）
- 总是客户端发出请求，服务器返回响应。
- 是无状态协议。（即本次请求与上次请求无丝毫关系。）
- 客户端
`建立连接并发送请求的应用程序。`
- 服务器
`接受连接并对请求返回响应信息的应用程序。`
- url
`网络中用来描述信息资源的字符串。`
###### HTTP/0.9
（又称单行协议。）
- 短连接（一次连接只能进行一次请求，响应）
- 请求
> GET url（只能请求文本）
- 响应
> 文本内容
- 请求方式
只有get
###### HTTP/1.0
- 请求  
>请求行（请求方式 url 协议版本）  
请求头（键：值）  
>  
>  请求正文（一般没有）
- 响应  
>响应行（协议版本号， 状态码， 状态信息）  
响应头（键：值）  
>  
>  响应正文
- 请求方式
GET/POST/HEAD
###### HTTP/1.1
- 默认使用长连接。（即一次连接可进行多次请求，响应,但必须上一次响应完成，才能进行下一次请求）
- 请求头添加Host
- 请求方式增加OPTIONS/PUT/DELETE/TRACE/CONNECT
###### HTTP/2.0
- 多路复用（允许同时通过单一的HTTP/2连接发起多重的请求-响应消息。即可以不等待上次响应到达就发送下一次请求。）
- 引入二进制框架层，通信分解为二进制编码帧的交换（即消息由单个或多个帧组成）。
- 服务器推送（服务器可对一个请求发送多个响应。即除了对原始请求的响应之外，服务器还可以向客户端推送额外的资源。）
- 头压缩（使用HPACK压缩）
#### 传输层
##### tcp
- 建立连接
1. 请求端发送SYN，seq=x（x为一个数字）。
2. 服务器接受后，回应ACK（值为请求中的x+1），SYN，seq=y（y为一个数字）。
3. 请求端发送ACK（值为响应中的y+1），SYN，seq=x+1。（此时连接成功，请求端可发送请求）。
- 关闭连接
1. 请求端发送FIN
### 参考资料
1. [网络协议](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/328636)
2. [深入理解Http协议](http://www.blogjava.net/zjusuyong/articles/304788.html)
3. [HTTP/2-高性能浏览器网站网络](https://hpbn.co/http2/)
4. [HTTP/2.0--知乎](https://www.zhihu.com/question/34074946)
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
