# SSL笔记
***
## 目录
#### [理论](https://github.com/person-0/test/blob/master/SSL.md#概念)  
- [对称加密](https://github.com/person-0/test/blob/master/SSL.md#对称加密)  
- [非对称加密](https://github.com/person-0/test/blob/master/SSL.md#非对称加密)  
- [摘要算法](https://github.com/person-0/test/blob/master/SSL.md#摘要算法)  
- [证书授权中心](https://github.com/person-0/test/blob/master/SSL.md#证书授权中心)  
- [openSSL](https://github.com/person-0/test/blob/master/SSL.md#openSSL)  
#### [实践](https://github.com/person-0/test/blob/master/SSL.md#用法)  
- [基础命令](https://github.com/person-0/test/blob/master/SSL.md#基础命令)
***
### 概念
#### 对称加密
> 加密（encryption）与解密（decryption）使用的是<strong>相同的密钥</strong>（secret key）。
##### 常见对称加密算法：  
- DES、3DES（TripleDES）
- AES
- RC2、RC4、RC5
- Blowfish  
#### 非对称加密
> 加密（encryption）与解密（decryption）使用的是<strong>一对密钥（公钥（public key）和私钥（private key））</strong>加密,使用这对密钥中的一个进行加密，而使用另一个解密。
##### 加密,解密
> 公钥加密数据为加密,私钥解密为解密。  
##### 签名,验证签名
> 私钥加密数据为签名,公钥解密为验证签名。  
##### 为什么创造它？
> ###### 问题：a发送文件给b，b怎么确定文件是a发的？
可行的做法是给文件添加标识，并要防止传输中标识被盗用，再看非对称加密：**公钥只能解开对应的密钥，而密钥只有生成者有**，如果用一个公钥能解开文件，就能证明文件是公钥生成者发送的，而密钥不进行传输，所以就无法被盗用（除非攻破生成者的电脑，这个就涉及其他方面，在这不做讨论。），正好解决传输中证明身份的问题。
##### 常见非对称加密算法：
- RSA
- DSA
- Elgamal
- 背包算法
#### 摘要算法
又称哈希算法、散列算法
> 把任意长度的数据转换为一个长度固定的的字符串的算法（加密过程不需要密钥，经过加密的数据无法被解密，只有输入相同的明文经过相同的摘要算法才能得到相同的密文。）
##### 为什么创造它？
> ###### 问题：网络传输过程中,差错总会存在,怎么确定接受到的信息和发送方发送的是否一致？
可行方法是设置检验机制进行检验，而摘要算法：**只有输入相同的明文才能得到相同的字符串**，收到数据后通过相同摘要算法生成字符串后与传过来的字符串比较，相同说明数据无改动。
>> 问题1：如果传输中摘要算法字符串出差错怎么办？  
只能再重传一下（概率很低）。  
>> 问题2：如果传输中有人把数据和字符串一起替换怎么办？  
传输中一般对字符串进行非对称加密，可防止替换。
##### 常见摘要算法：
- CRC（Cyclic Redundancy Check，循环冗余校验）
- SHA
- MD5
#### 证书授权中心
简称CA
> 负责签发证书、认证证书、管理已颁发证书的第三方机构。
1. 根证书
> CA认证中心给自己颁发的证书。
2. 数字证书
> 由CA签发的对用户的公钥的认证。(简单讲就是ca用自己的密钥对申请者的公钥和信息加密，生成一个文件，文件称为数字证书。)
##### 为什么创造它？
> ###### 问题：使用非对称加密之前，你需要先将公钥发给对方，如果这时在网络传输过程中如果有人将你的公钥换为他的公钥，怎么办？
可行方法是引入一个第三方证明接收到的公钥是你的公钥，而ca就是第三方，在接受者那里可通过ca证书验证公钥是不是你的（因为证书中有你的公钥，对比即可。那证书如果被替换呢？证书不可能被替换，因为你用ca的公钥（ca公钥是公开的）只能解开ca密钥加密的信息，所以只要能解开就一定是ca的。）。
***
#### openSSL
> 一个用于传输层安全（TLS）和安全套接字层（SSL）协议的商业级,全功能工具包,同时也是一个通用的加密库。
[官网](https://www.openssl.org/source/)
***
#### 用法
##### 安装
- window  
如果已安装Git，可以直接在Git-Bash中使用，无需专门安装。
##### 基础命令
（注 *以下操作均基于window环境*）
1. 生成私钥
> `openssl genrsa -out 私钥文件名.格式 1024`如：![private key]()
2. 生成公钥
> `openssl rsa -in 私钥文件名.格式 -pubout -out 公钥文件名.格式`
3. 生成证书请求文件
> `openssl req -new -key 私钥文件名.格式 -out a.csr`
***
![by](https://licensebuttons.net/l/by/4.0/88x31.png)  
本作品采用<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
