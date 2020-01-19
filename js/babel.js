const core = require('@babel/core');
const traverse = require('@babel/traverse');
const type = require('@babel/types');
const generator = require('@babel/generator');

let code = 'let a; export default {}';

// parser
let ast = core.parse(code);
// console.error('parser: \n', ast.program.body);


/**
 * 
 * traverse
 * 
 * Babylon和babel-traverse详解 https://github.com/xtx1130/blog/issues/7
 */
traverse.default(ast, {
  enter(path){
    // console.error(path.node);
  }
});

// transform https://blog.csdn.net/liangklfang/article/details/54879672
// https://www.cnblogs.com/QxkWeb/p/9483101.html
let VariableDeclarator = {
      enter(path){
        path.node.init = type.NumericLiteral(11);
        // console.error(path.node);
      },

      exit(path){
        console.error('exit');
      }
    };

let customPlugin = {
  visitor: {
    VariableDeclarator,
  },
  
};

let onlyPresetObj = { presets: ['env'] },
    onlyPluginObj = { plugins: [''] };

// let o = core.transform(code, onlyPluginObj);

/**
 * 
 * generator
 * 
 */
// console.error(generator);


/**
 * 
 * 深入理解Babel原理及其使用 https://www.jianshu.com/p/e9b94b2d52e2
 * 深入了解babel（二） https://segmentfault.com/a/1190000011746823
 * Babel插件源码分析与babel.transform和babylon.parse操作AST实现效果 https://blog.csdn.net/liangklfang/article/details/54879672
 * AST in Modern JavaScript https://www.jianshu.com/p/82894a71376e
 * 理解Babel是如何编译JS代码的及理解抽象语法树(AST） https://www.cnblogs.com/tugenhua0707/p/7863616.html
 * 大前端的自动化工厂（3）—— babel  https://bbs.huaweicloud.com/blogs/100006
 * 
 */