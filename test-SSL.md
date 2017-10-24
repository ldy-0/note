# SSL使用总结
***
## 目录
- [概念](https://github.com/person-0/test/blog/master/test-SSL.md#概念)
  + [对称加密](https://github.com/person-0/test/blog/master/test-SSL.md#对称加密)
  + [非对称加密](https://github.com/person-0/test/blog/master/test-SSL.md#非对称加密)
  + [摘要算法](https://github.com/person-0/test/blog/master/test-SSL.md#摘要算法)
- [openSSL](https://github.com/person-0/test/blog/master/test-SSL.md#openSSL)
  + [命令（window环境）](https://github.com/person-0/test/blog/master/test-SSL.md#命令（window环境）)
***
### 概念
#### 对称加密（Symmetric Cryptography）
> `加密（encryption）与解密（decryption）使用的是**相同的密钥**（secret key）。`  
##### 常见对称加密算法：  
- DES  
- 3DES（TripleDES）
- AES
- RC2、RC4、RC5
- Blowfish  
#### 非对称加密（Asymmetric Cryptography）
> `加密（encryption）与解密（decryption）使用的是**一对密钥（公钥（public key）和私钥（private key））**加密使用这对密钥中的一个进行加密，而解密则需要另一个密钥。`  
1. 加密,解密
> `公钥加密数据为加密,私钥解密为解密。`  
2. 签名,验证签名
> `私钥加密数据为签名,公钥解密为验证签名。`  
##### 常见非对称加密算法：
- RSA
- DSA
- Elgamal
- 背包算法
#### 摘要算法（又称哈希算法、散列算法）
> `把任意长度的数据转换为一个长度固定的的字符串的算法（加密过程不需要密钥，并且经过加密的数据无法被解密，只有输入相同的明文经过相同的摘要算法才能得到相同的密文。故用于完整性检验）`  
##### 为什么创造它？
> 网络传输过程中,差错总会存在,就需要有检验机制检验接受到的信息和发送方发送的是否一致。而摘要是算法只有输入相同的明文才能得到相同的密文。所以使用它进行完整性检验。
##### 常见摘要算法：
- CRC（Cyclic Redundancy Check，循环冗余校验）
- SHA
- MD5
#### CA（电子商务认证授权机构, Certificate Authority）
> `负责签发证书、认证证书、管理已颁发证书的第三方机构。`
1. 根证书
> `CA认证中心给自己颁发的证书。`
2. 数字证书
> `由CA签发的对用户的公钥的认证。`(简单讲就是ca用自己的密钥对申请者的公钥和信息加密，生成一个文件，文件称为数字证书。)
##### 为什么创造它？
> 因为网络传输过程中如果有人将你的公钥换为其他人的公钥，那加密形同虚设，所以需要一个第三方证明接收到的公钥是你的公钥，而ca就是第三方，在接受者那里可通过ca证书验证公钥是不是你的（因为证书中有你的公钥，对比即可。那证书如果被替换呢？证书不可能被替换，因为你用ca的公钥（ca公钥是公开的）只能解开ca密钥加密的信息，所以只要能解开就一定是ca的。）。
***
### openSSL
> 一个用于传输层安全（TLS）和安全套接字层（SSL）协议的商业级,全功能工具包,同时也是一个通用的加密库。[下载地址]（https://www.openssl.org/source/）
#### 命令（window环境）
1. 生成私钥
> `openssl genrsa -out 私钥文件名.格式 1024`如：![private key]()
2. 生成公钥
> `openssl rsa -in 私钥文件名.格式 -pubout -out 公钥文件名.格式`
2. 生成证书请求文件
> `openssl req -new -key 私钥文件名.格式 -out a.csr`
3. 生成
