/**
 * 
 * webpack
 * 
 * 一个entry对应一个bundle(包), 一个包就是IIFE, param: moduels是依赖模块映射对象, 
 * { 
 *   './src/index.js': (function(module, exports, __webpack_require__){  }) 
 * }
 * 
 * 
 */
let installModule = {};

function __webpack_require__(key){
  if(installModule[key]) return installModule[key].exports; 

  let module = installModule[key] = {
    i: key,
    l: false,
    exports: {},
  };

  modules[key].call(module.exports, module, module.exports, __webpack_require__);
}

/**
 * 
 * webpack源码阅读之Compiler  https://imweb.io/topic/5da1397aaf03a41f046a8df1
 * webpack运行流程: https://segmentfault.com/a/1190000015088834?utm_source=tag-newest
 * 
 */


/**
 * 
 * Error:
 * 
 * 1. Cannot find module 'yargs'
 * 具体原因不明, webpack下确实没有yargs包
 * 解决方案：重新install webpack webpack-cli
 * 
 * 2. Cannot find module 'config-yargs'
 * 原因：webpack-cli版本不兼容
 * 解决方案: 回退至以前版本
 * 
 * 3. This is probably not a problem with npm. There is likely additional logging output above.
 * 原因：webpack-dev-server 版本不兼容
 * 解决方案: 回退至以前版本
 * 
 */