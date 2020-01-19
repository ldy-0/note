const path = require('path');
const fs = require('fs');
const os = require('os');
const dns = require('dns');
const http = require('http');
const https = require('https');
const net = require('net');

// strict mode
// 1. this
// 2. identifier
// 2. console.log(010)
// 3. with({ a = 1 }){ console.warn(a) }
// 4. console.log(eval)
// 5. arguments.caller, no sync, no delete, freeze (function(a, b){ console.log(arguments, ) })(1, 2)

/**
 * 
 * Promise
 * 
 */
function promise(){
  let p = new Promise((resolve, reject) => {
    // console.error(a);
  }).then().catch(e => console.error('1'));
}
// promise();

// pify源码 https://juejin.im/post/5b8e1813e51d45578b0ab947 
// bluebird 中的promisify的原型源码 https://juejin.im/post/5ba9f061f265da0aee3f1726
// promise实现 https://juejin.im/post/5d6f7c83e51d4561c541a712
function promisify(fn){
  return function(){
    let argv = Array.from(arguments);

    return new Promise((resolve, reject) => { 
      argv.push(function(res){ resolve(res) }); 
      fn.apply(null, argv); 
    });
  }
}

/****** fs **********************************************************************************************************************************************************************************/
// console.log(fs.constants);

// access file 可访问性
// fs.access('./d', e => console.log(e))
// console.log(fs.accessSync('./node.js', fs.constants.R_OK))

// create dir 
function createJS(){
  let p = './di/r';

console.log(fs.existsSync(p));
  if(!fs.existsSync(p)){
    console.log(fs.mkdirSync(p));
  }
}
// createJS();
// fs.mkdir('./d/r', { recursive: true }, e => console.log(e)); v10


/**
 * 
 * v8.5.0+
 * 
 */
function copy(){
  let filePath = path.resolve('../index.html'),
      outPath = path.resolve('./index.html');

  return new Promise((resolve, reject) => {
    fs.copyFile(filePath, outPath, resolve);
    // fs.copyFile(filePath, outPath, fs.constants.COPYFILE_EXCL, resolve);
  });
}

/**
 * 
 * stream  https://blog.csdn.net/foruok/article/details/49120183 
 * 
 */
async function getContent(url){
  let filePath = path.resolve(url), 
      data = '',
      rs = fs.createReadStream(filePath),
      ws = fs.createWriteStream(path.resolve('./index.html'));

  rs.on('error', e => console.error(e));
  rs.on('data', chunk => data += chunk);

  rs.on('end', function(param){
    console.log(`\u001b[32m ${data} \u001b[0m`);
    // ws.write(data);
  });

}

// getContent('c:/windows/system32/drivers/etc/hosts');

/******* DNS ********************************************************************************************************************************************************************/
function resolve(hostName){
  // dns.setServers(['114.114.114.114']);
  // console.log(dns.getServers());

  dns.resolve4(hostName, handleResolve);

  // dns.promises.resolve4(hostName).then(res => console.log(`p: ${res}`), err => console.log(`p: ${err}`));

  function handleResolve(err, res) {
    if(err) return console.log(`\u001b[31m ${err.stack} \u001b[0m`);

    console.log(res);
  }
}

// resolve('g.alicdn.com');

/******* HTTP **************************************************************************************************************************************************************/
function get(url){
  let req = /^https/.test(url) ? https : http;

  req.get(url, handle);

  function handle(res) {
    let data = '';

    res.on('error', e => console.log(`\u001b[32m ${e} \u001b[0m`));
    res.on('data', chunk => data += chunk);

    res.setEncoding('binary');
    console.log(`${res.statusCode} ${res.statusMessage} ${res.httpVersion}\n`, res.headers);

    res.on('end', err => {
      if(err) return console.log(`\u001b[32m ${err} \u001b[0m`);

      // save(data, url.replace(/^.*\//, '',), 'g/gl/img/sky/');
      // save(data, url.replace(/^.*\//, ''));
      // save(data, 'captcha.jpg');
    });
    
  }
}
// get('https://sh.rustup.rs');
// get('https://threejs.org/examples/textures/cube/Bridge2/posx.jpg');
// get('https://threejs.org/examples/textures/cube/Bridge2/negx.jpg');
// get('https://threejs.org/examples/textures/cube/Bridge2/posy.jpg');
// get('https://threejs.org/examples/textures/cube/Bridge2/negy.jpg');
// get('https://threejs.org/examples/textures/cube/Bridge2/posz.jpg');
// get('https://threejs.org/examples/textures/cube/Bridge2/negz.jpg');

// get('http://rj.runjiaby.com/admin/login/index.html');
// get('http://rj.runjiaby.com/admin/login/checkverify.html');


function save(data, fileName, prefix = ''){
  fs.writeFile(`${prefix}${fileName}`, data, 'binary', err => console.log(err || `\u001b[32m ${fileName} download success \u001b[0m`))
}

/**
 * 
 * js encoding https://www.ruanyifeng.com/blog/2014/12/unicode.html
 * String.raw https://blog.csdn.net/ixygj197875/article/details/79101708
 * 
 */

function testString(){
  let str = '𢈢\ud848\ude22',
      teStr = String.raw`a\tb`,
      codePoint = 0x22222 - 0x10000;
  // default 0    valid [-Infinity, Infinity]->trunc()    invalid Number() NaN>0      charAt,charCodeAt,codePointAt,indexOf
  // defalut [0, length]    valid [-Infinity, Infinity]->trunc()->(slice[-length, -1]->[0, length])    invalid Number() NaN>0      substring,slice,substr 
  // default length    valid: [-Infinity, Infinity]->trunc()->[-Infinity, 0)>0    invalid Number() NaN>length      lastIndexOf 
  // default length    valid (-Infinity, Infinity)->trunc()->(-Infinity, 0)>length    invalid 1. undefined>length 2.Number() [NaN, +-Infinity]->0      split 
  // default 0    valid [0, Infinity)->trunc()    invalid 1. [-Infinity, 0)|Infinity throw 2. NaN->0      repeat 

  // default ''    valid regExp|String()      replace 
  // default ''    valid 1. undefined>'' 2.regExp|String()    search,match 
  // default undefined    valid 1.undefined>返回原字符串数组 2.regExp|String(null, Boolean, Number, Object)   split

  // stringNumeric

  console.error(str.length);
}

// testString();

/**
 * 
 * 2019/2/19 <CR><LF>\r\n https://zhidao.baidu.com/question/464327090.html?qbl=relate_question_1
 *                        https://blog.csdn.net/lw370481/article/details/8229344
 * 2019/4/23 lastIndex https://www.jb51.net/article/120608.htm 
 * 2019/4/23 预查与lastIndex https://www.jb51.net/article/110225.htm 
 * 2019/5/14 行终止符 http://tools.jb51.net/table/javascript_escape
 * 正则字面量与new RegExp执行效率 https://www.cnblogs.com/52cik/p/js-regular-literal-regexp.html
 * Unicode 属性匹配（\p） http://zh.javascript.info/regexp-unicode-properties
 * 常用正则表达式 https://www.jianshu.com/p/10823e81f327
 * 
 * 正则表达式工作原理 http://www.ayqy.net/blog/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/
 * 
 */

function testRegExp(){
  // 元字符(.除外)在集合中不转义
  // {1,2}不能有空格，/^\d{1, 2}$/g.test('1')为false，exec为null
  // 全局匹配修改lastIndex, 所有匹配失败后lastIndex重置为0
  // 多行匹配中行终止符为换行标记
  // 粘性匹配仅在指定索引处匹配
  // exec: default value: undefined, virtual value: string, invalid value -> toString
  let r1 = /[^]/g,
      r2 = /^a/gm,
      r3 = /a/y,
      match;

  // while((match = r1.exec(' \n')) !== null){ console.error(match, r1.source, r1.flags, r1.lastIndex); }

  // match = r2.exec('ab\u2028a'); console.error(match, r2.multiline);
  // match = r2.exec('ab\u2028a'); console.error(match, r2.multiline);

  // r3.lastIndex = 1;
  // console.error(r3.test('aba'));

}
// testRegExp();

/**
 * es9/2018
 * Bigint https://www.cnblogs.com/wangmeijian/p/9217352.html
 */

/**
 * 
 * JS日期时间串格式 http://www.ayqy.net/blog/js%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E4%B8%B2%E6%A0%BC%E5%BC%8F/ 
 * 
 */
function testDate(){
  // ES5.1之前通用格式 1. /year\/month\/date HH:mm:ss/ (IE6+) 2. day date month year HH:mm:ss
  // ES5.1+ define DateTimeString format(ISO 8601格式)  /year-month-date(THH:mm:ss)?(.sss)?(Z|[+-]HH:mm|)?/
  let date = new Date(),  // param:  |timestamp(按UTC parse)|dateTimeString(一般按localTime parse)|year,month[,date,[HH...]]  return: UTC时间对象
      dateStr = Date();   // return:  dateTimeString 'Fri Aug 30 2019 12:50:55 GMT+0800 (中国标准时间)'(localTime)
  
}

/**
 * 
 * try.catch性能 https://www.jb51.net/article/101291.htm
 * JS性能优化 https://www.cnblogs.com/cnblogs-jcy/p/5654351.html
 * deepCopy https://blog.csdn.net/ligang2585116/article/details/55505841
 * js博客 https://blog.csdn.net/VhWfR2u02Q/article/details/81916786
 * FE资源汇总 https://juejin.im/post/5cc1da82f265da036023b628
 * 内置函数实现 https://juejin.im/post/5cef46226fb9a07eaf2b7516
 * deepClone https://juejin.im/post/5d3468116fb9a07eb051fdfc
 * ot算法 https://juejin.im/post/5d3437b2f265da1b827ad7c9
 * 
 */

function initBinding(env, code, args){
  let configurableBindings = typeof code === 'eval';

  let strict = isStrict();

  if(typeof code === 'func'){
    initFuncBinding(env, code, args, strict);
  }

  // 按源码顺序遍历 code，对于每一个 FunctionDeclaration 表达式 f：
  for(let i = 0, len = code.length; i < len; i++){
    let fn, fo, existingProp;

    if(typeof code[i] === 'FunctionDeclaration'){
      // 令 fn 为 FunctionDeclaration 表达式 f 中的 标识符 。
      fn = code[i].name;
      // 按 第 13 章 中所述的步骤初始化 FunctionDeclaration 表达式 ，并令 fo 为初始化的结果。
      fo = initFunctionDeclaration();

      argAlreadyDeclared = env.hasBinding(fn);
      if(!argAlreadyDeclared) env.CreateMutableBinding(fn, configurableBindings);
        else if(env === globalObj){
          let go = globalObj;
          existingProp = go[[GetProperty]](fn);

          if(existingProp[[Configurable]]) go[[DefineOwnProperty]](fn, {[[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: configurableBindings });
            else if(IsAccessorDescrptor(existingProp) || !existingProp[[Writable]]) throw new TypeError();
          
          env.SetMutableBinding(fn, fo, strict);
        }
    }

  }

// 按源码顺序遍历 code，对于每一个 VariableDeclaration 和 VariableDeclarationNoIn 表达式：
  for(let i = 0, len = code.length; i < len; i++){
    let dn = code[i].name;
    let varAlreadyDeclared = env.HasBinding(dn);

    if(!varAlreadyDeclared) env.CreateMutableBinding(dn, configurableBindings);
    env.SetMutableBinding(dn, undefined, strict);

  }
  
}

// moduleEnv: 包含模块顶级声明的绑定的lexicalEnv
// functionEnv: invoke ecmascript函数对象相对应的lexicalEnv
// envRecord [declartiveEnvRec, ObjEnvRec, globalEnvRec]
// declartiveEnvRecord: 绑定其scope内的声明定义的标识符集。 [FunEnvRec, ModuleEnvRec]
// globalEnvRec, FunEnvRec, ModuleEnvRec
// hasBinding true, [[thisbindingstatus]] = 'lexical' || arrowFun ? false : true, true
// getBinding [[globalthisvalue]], [[thisvalue]], undefined

/**
 * 
 * nvm
 * 
 * nvm下载地址,命令 https://blog.csdn.net/qq_32682137/article/details/82684898
 * 环境变量:
 *   NVM_HOME(settings.txt所在目录) C:\Users\EDZ\Desktop\person\soft\nvm\nvm-noinstall
 *   NVM_SYMLINK(当前使用node所在目录) C:\Users\EDZ\Desktop\person\soft\nvm\nodejs 
 * 
 */

/**
 * 
 * npm
 * 
 * zh-doc: https://www.axihe.com/api/npm/cli/npm-update.html
 * 
 * 2019.5.10 全局包位置 https://newsn.net/say/npm-whereis.html
 * 2019.5.21 cache https://www.cnblogs.com/chen8840/p/10002785.html
 * npm,yarn,pnpm https://blog.csdn.net/qiansg123/article/details/80129453
 * npm 常用命令详解 https://www.cnblogs.com/itlkNote/p/6830682.html
 * 2019.7.22 https://juejin.im/post/5d08d3d3f265da1b7e103a4d
 * 
 * config(配置参数)
 * --表示停止读取标志 --f1 --f2 a表示将配置参数f1设置为true(default), 将f2设置为a
 * shorthand(简写)
 * -l --long
 * 
 * npm config(cmd方式) https://blog.4d4k.com/2018/01/16/%e6%b7%98%e5%ae%9dnpm%e9%95%9c%e5%83%8f%e4%bd%bf%e7%94%a8%e6%96%b9%e6%b3%95/
 * npmrc等级: package > userconfig(用户目录下) > globalconfig(prefix路径下) > build-in
 * npm config 只能修改userconfig/globalconfig的npmrc文件
 * npm config -g set/delete 操作, globalconfig的npmrc会重生成(只包含自定义属性) 
 * npm config -g edit操作, globalconfig的npmrc文件会含有全部属性
 * npm config set 报名:属性名 value
 * npm config get prefix 获取全局包安装地址
 * js中获取config参数：process.env.npm_config_*(globalconfig | userconfig)
 * js中获取package信息: process.env.npm_package_*
 * 
 * npm root 最近或全局node_module目录路径
 * npm prefix 最近或全局node_module父目录路径 
 * npm bin 最近或全局bin目录路径
 * npm ping 检查registry是否可以连接
 * 
 * npm init
 * 自定义配置 `${npm config get init-module}/.npm-init.js`
 * 
 * npm 3之前 依赖隔离
 * 1. 一级目录不存在包，install, 
 * 2. 一级目录存在包，
 *   2.1 版本一致，ignore
 *   2.2 install 引用包的node_modules
 * dependence类型 https://www.cnblogs.com/dfyg-xiaoxiao/p/10004392.html
 * 
 * npm install [-P|-D|-O|--no-save] [-E] [-B]
 * -P --save-prod       dependence(default)
 * -D --save-dev        devDependence
 * -O --save-optional   optionalDependencies
 * --no-save            package不加入Dependence
 * -E --save-exact package(精确版本)
 * -B --save-bundle 同时加入bundleDependencies
 * scope package
 * https://blog.csdn.net/u013727805/article/details/80849329
 * 作用域关联注册表(安装和发布地址关联注册表地址) npm config set scopeName:registry 注册表地址 
 * 
 * 更新 update(up, upgrade)
 * 更新主版本需要install x@latest
 * 1. 包为插入符依赖 更新至当前主版本号下最新版本
 * 2. 包为波浪依赖 更新至当前次版本号下最新版本
 * 
 * 查看package info
 *   查看npm服务器中package info: npm view(info|show|v) @scopeName/packageName@版本号 field(如果field是数组，field.name 输出每项name)
 * 
 *   查看本地中package info: npm ls(list) [packageName]
 *   --depth=number dependency tree depth
 *   --only=dev|prod --dev --prod 仅查看开发环境依赖或正式环境依赖
 *   --global 全局依赖
 *   --link 链接
 * 如何查看一个包的版本信息？:  https://blog.csdn.net/cvper/article/details/79543262
 * 
 * 
 * 2019.5.13 link, unlink https://yq.aliyun.com/articles/610001
 * 2019.7.17 npm link 
 *   1. currentLib -> {prefix}/node_modules/<package> (成为全局包), 
 *   2. currentLib package.json中bins中命令 -> {prefix}/<command> (成为全局命令)
 *   https://segmentfault.com/a/1190000012567323
 * 
 * npm version
 * npm version [--allow-same-version] 版本号(修改package.json, package-lock.json中version值)
 * npm version 全方位解读 https://segmentfault.com/a/1190000020586193
 * 
 * npx 包执行器
 * 简化cli方式运行包(包不存在会临时安装，使用完成删除包)
 * 
 */

let npmError = [
  {
    name: ' EBUSY: resource busy or locked,',
    resolve: ['清除npm缓存 执行命令 npm cache clean --force', '重新执行命令'],
    time: '2019.5.13',
  }
];

/**
 * 
 * node
 * https://github.com/yjhjstz/deep-into-node
 * nodejs原理&源码赏析（1） https://bbs.huaweicloud.com/blogs/f24bb6ebbc7511e89fc57ca23e93a89f
 * node源码详解（六） —— 从server.listen 到事件循环  https://www.cnblogs.com/papertree/p/5398008.html
 * node-ssh deploy： https://www.cnblogs.com/dashnowords/p/11293667.html
 * 
 * 自定义cmd
 * 浅析webpack源码之webpack.cmd https://www.cnblogs.com/QH-Jimmy/p/8016832.html
 * 
 * console修改输出字体样式: https://www.jianshu.com/p/cca3e72c3ba7
 * \u001b[样式;背景色;前景色;m 重置样式:\u001b[0m
 * https://blog.csdn.net/w2sft/article/details/104027270?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4
 * 
 * node-gyp
 * gyp: 代码编译工具(配置文件.gyp) https://blog.csdn.net/u013095415/article/details/83448725?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
 * 调用gyp的node包 https://blog.csdn.net/github_36487770/article/details/81052936
 * 
 */

/**
 * 
 * electron https://blog.csdn.net/u011483206/article/details/74327939/
 * 
 */

/**
 * 
 * vscode
 * 命令面板 ctrl+shift+p
 * 代码提示: ctrl+space(被系统占用)
 * trigger parameter hint触发参数提示: ctrl+spift+space
 * 切换语言: ctrl+k m
 * tab 空格 https://blog.csdn.net/xiaomizhou66a/article/details/80910553
 * 一次搜索所有文件的文本 https://juejin.im/post/5d34fdfff265da1b897b0c8d#heading-0 
 * 修改编辑器内代码的颜色 http://geek-docs.com/vscode/vscode-tutorials/vscode-modify-editor-color-matching.html
 * 启用vim后vsCTRL快捷键失效解决: "vim.handleKeys": { "<C-k>": false, }
 * 
 */

/***
 * 
 * Eslint
 * eslint Rules: https://cloud.tencent.com/developer/section/1135779
 * 
 */

/**
 * 
 * think(下面tip)
 * 1. 使express:a == 1 && a == 2 && a == 3 return true
 * 2. 实现双重排序(按总分数降序排列，总分数相等按数学分数降序排列)
 * 3. 7道简单题: https://juejin.im/post/5dbe818a6fb9a0203c34e4bb?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com
 * 4. call,apply,bind,new实现 https://github.com/mqyqingfeng/Blog/issues/17
 * 5. Reflect作用: http://tech.dianwoda.com/2017/08/09/jsde-fan-she-xue-xi-he-ying-yong/
 * 
 */


/**
 * 
 * 2019/4/24 nodejs in 树莓派 https://www.cnblogs.com/BruceWan/p/6144692.html
 * nodejs https://www.ctolib.com/nodejs/
 * sync: 直接在主线程执行， async : 执行前需进入task queue的任务
 * 
 * extensible
 * 2019/4/24 rpg maker mv http://play.163.com/17/1018/17/D121SIQD00318QLI.html
 * vscode eslint https://blog.csdn.net/weixin_39015132/article/details/83930358
 * 进程概述和内存分配 https://blog.csdn.net/xueli1991/article/details/51693445
 * Node.js 中的进程与线程 https://juejin.im/post/5d43017be51d4561f40adcf9#heading-26
 * os https://blog.csdn.net/qq_41727666/article/list/6?
 * 
 * 贝塞尔曲线 https://blog.csdn.net/qq_31968791/article/details/88360165
 * 权重的概念理解三次贝塞尔曲线 https://blog.csdn.net/weixin_43795921/article/details/86685610
 * math matrix https://blog.csdn.net/iloveas2014/article/category/7442073/2?
 * 
 * 为什么偷走爱情的女人，总是相貌平平 https://www.jianshu.com/p/6b21999c2771?utm_campaign=maleskine&utm_content=note&utm_medium=pc_all_hots&utm_source=recommendation
 * 
 * ai分享站: http://www.aisharing.com/
 * 
 * web FED推荐网站:  http://news.51cto.com/art/201807/577881.htm
 * 
 * 2019js新方向: https://www.sitepoint.com/community/t/how-to-take-javascript-beyond-the-web-in-2019/320352
 * 知乎趣答: https://blog.csdn.net/kexuanxiu1163/article/details/100613498
 * tensorFlow.js作者访谈: https://developer.aliyun.com/article/724697?spm=a2c6h.13066369.0.0.63be10ef5gB1Lb
 * 
 * cdn
 * 360:       https://cdn.baomitu.com/
 * bootstrap: https://www.bootcdn.cn/tinymce/
 * 
 */

/**
 * 
 * tip
 * 1. object type convert
 * 2. sort函数: https://blog.csdn.net/qq416761940/article/details/79632018
 * 
 */