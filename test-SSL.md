# SSL 
##
### 概念
#### 对称加密（Symmetric Cryptography）
> `加密（encryption）与解密（decryption）使用的是**相同的密钥**（secret key）。`
常见对称加密算法：  
-DES  
-3DES（TripleDES）
-AES
-RC2、RC4、RC5
-Blowfish  
#### 非对称加密（Asymmetric Cryptography）
> `加密（encryption）与解密（decryption）使用的是**一对密钥（公钥（public key）和私钥（private key））**加密使用这对密钥中的一个进行加密，而解密则需要另一个密钥。`  
1.加密,解密
> `公钥加密数据为加密,私钥解密为解密。`  
2.签名,验证签名
> `私钥加密数据为签名,公钥解密为验证签名。`
