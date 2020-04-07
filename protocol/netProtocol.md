# 网络协议笔记
***
## 目录
- [简介](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#简介)
- [应用层](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#基础理论)  
  + [DNS](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#dns)  
  + [HTTP](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#http)  
  + [TCP](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#tcp)
- [参考资料](https://github.com/person-0/note/blob/master/%E5%8D%8F%E8%AE%AE/netProtocol.md#参考资料)
***
## 简介
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
![5](https://images2015.cnblogs.com/blog/806469/201605/806469-20160511100906999-650339196.png)
（注 *本图片来自http://www.cnblogs.com/iiiiher/p/5480947.html*）

> 互连网: 多个计算机网络组成的计算机网络
> 互联网(因特网): 一个互连网,采用TCP/IP协议
> 万维网: 因特网中应用层使用HTTP协议的网络

### 应用层

#### DNS
域名系统
- 根域名服务器
存放着所有顶级域名服务器的域名与IP映射关系。
- 顶级域名服务器
存放着该域名下所有二级域名与IP的映射关系。
- 权限域名服务器
存放着该区内所有主机域名与IP的映射关系。
- 本地域名服务器
存放着同一ISP（因特网服务提供商）所有主机域名与IP的映射。
> 当主机发送DNS查询请求时，就发送给本地域名服务器。
> 高速缓存域名服务器：存放近期查询过的域名和从哪里获取查询。
- 域名查询
1.域名解析器查询本地缓存和host文件，不存在进行下一步。
2.主机采用递归查询，到本地域名服务器查询，不存在进行下一步。
3.本地域名服务器采用迭代查询，到根域名服务器查询，返回一个相应的顶级域名服务器IP。
4.本地域名服务器向顶级域名服务器查询，直至得到一个相应的权限域名服务器IP。
5.本地域名服务器向权限域名服务器查询，直至得到所查主机IP。
6.本地域名服务器缓存映射关系，并返回所查主机IP给主机。
7.域名解析器解析完成返回给浏览器。
***

#### http
用于从服务器传输资源到本地浏览器的网络传输协议。（简称HTTP，默认端口号80） 半双工通信(可双向传输信息但在任意时刻只能单向传输)
- 客户端 `建立连接并发送请求的应用程序。`
- 服务器 `接受连接并对请求返回响应信息的应用程序。`
##### 特点
- 总是客户端发出请求，服务器返回响应。
- 无状态协议。（即本次请求与上次请求无丝毫关系。）

##### 资源标识
URI(abstract define)
- 1. URL(specific real): 通过定位标识
- 2. URN: 通过名字标识 urn:issn:1535-3613
> \<scheme>://\<user>:\<password>@\<host>:\<port>/\<path>;\<param>?\<query>#\<flag>  
> URIReserved: :/@?=&#()[]+*,';!$
> URI允许但不是reserved: 字母数字-_~.
> 百分号编码(URL编码): 对URI中不允许的字符转为%xx格式
> js中URIReserved: :/?&=+@;,$  
> URIMark: ()!'*-_~.

[url详解](https://www.cnblogs.com/xiaohuochai/p/6144157.html)  
[+-_表示空格](https://blog.csdn.net/qq_36119192/article/details/90348970)  
[淘宝首页使用,同时加载多文件(合并请求)](https://developer.aliyun.com/ask/80984?spm=a2c6h.13159736)  
[!实现DMI(dynamic method invoke/动态方法调用)](https://www.oschina.net/question/130012_21309)  
[app自定义uri](https://bbs.feng.com/read-htm-tid-8941179.html)

##### 资源类型
MIME (Multipurpose Internet Mail Extensions) :因特网中描述资源类型的标准
- application/x-www-form-urlencoded
 1. space -> +
 2. 使用URL编码
 3. key=value&key=value  
[W3C HTML Form content types规范](https://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1)

##### 协议版本

###### HTTP/0.9（又称单行协议）
- 默认为短连接（一次连接只能进行一次请求，响应）（只能请求文本）
- 请求格式: `method path`
- 响应格式: `文本内容`
- 请求方式: 只有get

###### HTTP/1.0
- 请求格式  
  > 请求行（method url 协议版本）  
  > 请求头（键：值）  
  >  
  >  请求正文（一般没有）
- 响应格式
  > 响应行（协议版本号， 状态码， 状态信息）  
  > 响应头（键：值）  
  >  
  >  响应正文
- 请求方式: GET/POST/HEAD

[HTTP1.0](https://www.w3.org/Protocols/HTTP/1.0/spec.html)

###### HTTP/1.1
- 默认使用长连接模式。（即一次连接可进行多次请求，响应,但必须上一次响应完成，才能进行下一次请求）
> 流水线连接模式: 一次请求发送完成，可以直接发送下一个请求，但响应返回顺序必须与请求发送顺序一致(会有线头阻塞问题)
- 请求头必须有Host字段,(区别多个虚拟主机), 没有报400(bad request)
- 请求方式增加OPTIONS/PUT/DELETE/TRACE/CONNECT
> 增加连接：浏览器为每个域名建立的最大连接数为6个,域名分片
> 合并请求：精灵图，内联, js合并

###### HTTP/2.0
- 多路复用（允许同时通过单一的HTTP/2连接发起多重的请求-响应消息。即可以不等待上次响应到达就发送下一次请求。）
- 引入二进制框架层，通信分解为二进制编码帧的交换（即消息由单个或多个帧组成）。
- 服务器推送（服务器可对一个请求发送多个响应。即除了对原始请求的响应之外，服务器还可以向客户端推送额外的资源。）
- 头压缩（使用HPACK压缩）

[HTTP存在的问题](https://ye11ow.gitbooks.io/http2-explained/content/part2.html)

###### HTTPS
建构在SSL/TLS之上的 http协议。
CA证书: 申请人公钥,主体信息,有效期,CA机构及签名(CA密钥加密后的证书内容摘要)
建立连接（以建立TCP连接）
1. 请求端发送客户端SSL 协议的版本号，加密算法的种类等信息。
2. 服务器发送SSL 协议的版本号，加密算法的种类等信息及CA证书
3. 请求端进行合法性检验，通过后生成随机对称密码并对通过摘要算法计算出的信息加密，用收到的公钥对随机对称密码和加密后的摘要信息加密并发送。
4. 服务器用同样的摘要算法计算，然后使用密钥解密，获得对称密码，再解密摘要信息，对比二个摘要信息，相同则使用随机密码加密信息并发送。
5. 请求端解密对比信息，通过则连接成功。

[CA认证的原理和流程及https原理](https://www.cnblogs.com/yunlongaimeng/p/9417276.html)  
[HTTPS原理和CA证书申请](https://blog.csdn.net/weixin_34071713/article/details/91665458?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)

###### 请求方式
- HEAD 获取资源GET请求的响应头信息
- OPTION 获取资源支持的访问信息
> 安全请求(不改变资源状态的请求): get|head|options 
> 幂等请求(一个请求执行一次和执行n次资源状态一致): get|head|options|put|delete  
> [put为什么幂等](https://www.cnblogs.com/weidagang2046/archive/2011/06/04/idempotence.html)

###### 头部字段
- 通用头部
描述连接信息,可以出现在请求和响应中
> `Connection` close通知服务器响应发送完成立即发送FIN帧 keey-alive通知服务器连接暂不关闭 
- 实体头部
描述正文信息,可以出现在请求和响应中
> `Content-Type`，`Content-length`
- 请求头
描述请求
  + User-Agent
- 响应头
描述响应
  + Server
###### 状态码
- 200 请求成功
- 204 请求成功，无响应内容。当前页面不刷新，也不导向新的页面。
用于提交信息但不想跳转。
- 206 请求成功。请求目标URL上的部分资源的时候返回的。
由于继续请求未完成下载的大文件时。
- 300 用户选择重定向
- 301 永久重定向(除get不变，其他请求方式可能改为get)，搜索引擎会替换旧URL，客户端可缓存
- 308 永久重定向(请求方式不变)，搜索引擎会替换旧URL，客户端可缓存
- 302 临时重定向(除get不变，其他请求方式可能改为get)，搜索引擎不会替换，客户端不缓存
- 307 临时重定向(请求方式不变)，搜索引擎不会替换，客户端不缓存
- 303 临时重定向(所有请求改为get)
- 304 重定向至缓存
- 404 请求资源不存在
- 500 服务器内部错误

##### 内容协商
vary: * 表示缓存服务器不进行缓存  
[vary用途](https://blog.csdn.net/weixin_34113237/article/details/88730866?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)

##### 来源策略
referer: 请求所在页面的来源url
页面默认为no-referrer-when-downgrade,可通过<meta name="referrer" content="">设置  
[referrer-policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)

##### CORS
允许共享域中的合法请求访问资源
access-control-allow-origin|methods|headers|credential资源允许共享的域|方式|头字段|设置cookie(如果为false,即使有set-cookie,也无法在UA中设置cookie)
> 预检请求: origin|access-control-request-method|headers
> 预检响应：access-control-max-age 域检请求缓存时间
> cors请求：符合共享条件的跨域请求(跨域请求必须携带origin,但携带origin的不一定是跨域请求)

##### cache
HTTP1.0: pragma: no-cache(使用缓存前必须验证缓存)
         expires: GMT,UTC格式(资源到期时间,cache-control设置了max-age,该头部被忽略)
         last-modified: GMT格式
         if-modified-since: 缓存资源的last-modified(缓存验证请求携带)
HTTP1.1: cache-control: no-store|no-cache|private(default)|public [max-age|s-maxage] [must-revalidate|no-transform]
         etag: 资源特定版本的标识(1.时间验证精度不够(秒级) 2.资源没变但时间可能被修改(服务器定期更新))
         if-none-match: 缓存资源的etag(缓存验证请求携带)
         if-match: 缓存资源的etag(缓存修改请求携带, 匹配失败报412(避免'空中碰撞'))
         age: 代理服务器中资源缓存了多长时间

[must-revalidate作用](https://zhuanlan.zhihu.com/p/60357719)

##### authorization|compress|redirect|cookie
www-authenticate: 认证方式
authorization: 用户凭证
端压缩: 服务器对资源副本压缩,UA解压
逐跳压缩: 两个相邻网络节点间解压缩
location: 请求路径
set-cookie: key=value; [max-age|expires] [domain|path] [httpOnly(禁止js访问)] [samesite=none|lax(跨域get请求也可以携带)|strict(只有同源携带)]
script请求会自动携带相关cookie, xhr请求默认不携带，通过withCredentials开启
> 第三方cookie: cookie的domain与当前页面domain不一致
> CSRF(cross-site-request-forgery)跨站请求伪造: 同源策略仅能限制xhr,无法限制其他跨域请求(如表单的post请求)

[xhr携带cookie,access-control-allow-orgin不能为*](https://www.jianshu.com/p/c115e4a24977)  
[SameSite属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

##### range
if-range|range|accept-range|content-range
多范围请求 content-type: multipart/bytesrange boundary=分隔符
transfer-encoding: chunked(分块传输编码)

[http1.1规范文档](https://tools.ietf.org/html/rfc7231#section-4.2.2)  
[http发展史](https://juejin.im/post/5dc6c7a8e51d45160d04a480)  
[详解request Head](https://blog.csdn.net/alexshi5/article/details/80379086)  
[request Head不允许传date](https://segmentfault.com/q/1010000003912685/a-1020000003967561)  
[协议upgrade请求(仅限http1.1)(将已建立请求升级为新的协议)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Protocol_upgrade_mechanism)
***

#### 传输层
##### tcp
一种面向连接的、可靠的、基于字节流的传输层通信协议。（简称TCP）
- 面向连接
- 点对点
一条TCP连接只能有二个端点。
- 可靠传输
传输的数据无差错，不丢失，不重复，按序到达。
###### 停止等待协议
发送方发送消息，如果在指定时间内收到接收方发送的确认，继续发送下个消息，否则重新发送消息。
###### 滑动窗口协议
- 滑动窗口
已发送已确认，已发送未确认，可发送未发送
已发确认已使用，已发确认未使用，未发确认
- 重传时间
- 全双工通信
- 有状态
- 建立连接
1. 请求端创建TCB（传输控制块）发送同步位SYN=1，初始序号seq=x（x为一个数字）。（不允许携带数据，消耗一个序号）
2. 服务器同意建立后，回应SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y（y为一个数字）。（不允许携带数据，消耗一个序号）
3. 请求端发送ACK=1，确认号ack=y+1，序号seq=x+1。（可以携带数据，如果不携带数据，则不消耗序号，下次传输序号还为x+1）（此时连接成功，请求端可发送请求）。
- 关闭连接
1. 请求端发送终止控制位FIN=1，序号seq=n（之前传送过的最后序号+1，）（不允许携带数据，消耗一个序号）
2. 服务器收到后**立刻**发送ACK=1，seq=m，ack=n+1（不判断是否有数据发送。）
3. 如果有数据，等到数据发送完成，服务器发送FIN=1，ACK=1，seq=v，ack=n+1。
4. 请求端发送ACK=1，seq=n+1，ack=v+1（此时请求端不立刻关闭，需等待2MSL（如果服务器未收到ACK，会再发送FIN，等待时间是为了确认服务器收到））。

### 参考资料
1. [网络协议](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/328636)
2. [深入理解Http协议](http://www.blogjava.net/zjusuyong/articles/304788.html)
3. [HTTP/2-高性能浏览器网站网络](https://hpbn.co/http2/)
4. [HTTP/2.0--知乎](https://www.zhihu.com/question/34074946)
5. [计算机网络1-知乎](https://zhuanlan.zhihu.com/p/22516664)
6. [计算机网络2-知乎](https://zhuanlan.zhihu.com/p/23014683)
7. [http状态码301和302详解及区别——辛酸的探索之路](http://blog.csdn.net/grandPang/article/details/47448395)
8. [http状态码204/206/200理解](http://www.mamicode.com/info-detail-1825350.html)

***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本页采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
