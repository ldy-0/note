/**
 * 
 * jestv24+ includes babel-jest
 * 
 * jest运行单个文件 https://www.jianshu.com/p/c3a09a710201?from=groupmessage&isappinstalled=0
 * 
 * jest处理es模块:  https://www.cnblogs.com/xueyoucd/p/10495922.html
 * Jest应用踩坑记:  https://blog.csdn.net/weixin_34062329/article/details/91477909
 * 
 */

// ---------------- Matcher ----------------------------------
// toThrow('')中有参数会进行字串匹配 eg: err: 'type error' 参数为''|'type'测试通过 't2'测试失败

// custom matcher
// 前端测试框架Jest系列教程: https://www.cnblogs.com/Wolfmanlq/p/9119290.html
expect.extend({
  toBeTrue(received, argument){
    return { 
      message: () => received ? '' : `received: ${received}\nexpect: true`, 
      pass: received ? true : false, 
    };
  },
});
// expect(flase).toBeTrue();