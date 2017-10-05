# SSL 
***
##
***
### 概念
#### 对称加密（Symmetric Cryptography）
> `加密（encryption）与解密（decryption）使用的是**相同的密钥**（secret key）。`  
常见对称加密算法：  
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
常见非对称加密算法：
- RSA
- DSA
- Elgamal
- 背包算法
#### 摘要算法（又称哈希算法、散列算法）
> `把任意长度的数据转换为一个长度固定的的字符串的算法（加密过程不需要密钥，并且经过加密的数据无法被解密，只有输入相同的明文经过相同的摘要算法才能得到相同的密文。故用于完整性检验）`  
常见摘要算法：
- CRC（Cyclic Redundancy Check，循环冗余校验）
- SHA
- MD5
