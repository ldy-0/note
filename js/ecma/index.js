/**
 * ecma指引: https://www.cnblogs.com/shidengyun/p/5327775.html
 * es5.1 zh-cn http://lzw.me/pages/ecmascript/
 * es9         https://segmentfault.com/a/1190000010518810#articleHeader8
 * ES10
 * 
 * 1-4 overview
 * 6-7 Type
 * 8-9 execEnv 
 * 10-16 lexical 
 * 17+ standard library 
 * 
 * 
 * 论ES6模块系统的静态解析 https://blog.csdn.net/liaozhongping/article/details/68923745
 * module加载 https://blog.csdn.net/chenqiuge1984/article/details/80131371
 * 
 * 重学 JS(五)-- async 原理  https://www.h3399.cn/201804/574077.html
 */
const Type = require('./lib/type');
const Numeric = require('./standard/numeric');

/**
 * 
 * asi(自动分号填充) https://segmentfault.com/a/1190000004548664
 * 
 */

/**
 * 5 
 */
function _syntax(){
  // statementList[return] : 1. [+return] returnStatement 2. expressStatement
  //   1. statementList : expressStatement
  //   2. statementList[return] : 1. returnStatement 2. expressStatement

  // statementList[return] : 1. [~return] returnStatement 2. expressStatement
  //   1. statementList[return] : expressStatement
  //   2. statementList : 1. returnStatement 2. expressStatement
}

// 6-7
function _type(){
  /**
   * 
   * 无
   * 
   *  增加null表示无
   *  第一版的JavaScript是用32位bit来存储值的，且是通过值的低1位或3位来识别类型的
   *  null 机器码空指针（C/C++ 宏定义），低三位也是000, 所以被typeof认为object
   * 
   *  后来发现一系列诡异情况，又增加undefined表示无
   * 
   */

  /**
   * 
   * string: uint16值组成的set
   */

  // standardObj 遵循ecma规范语义的对象(nativeObj)
  // 普通对象:          has 11个基本interal method和prototype, extensible的对象, interal method具体实现不一定相等
  // FuncObj:          has [[call]] interal methods(call via FunCallExpress)
  // constructObj:     has [[construct]] interal methods(call via new|super)
  // exoticObj外部对象 不完全具有11个基本interal method的对象
  let object = {
    // setPrototypeOf, getPrototypeOf, isExtentsible, preventExtentsions,
    // getOwnProperty(own prop), defineOwnProperty(own prop) ownPropertyKeys(own prop)
    // hasProperty(own|inherit prop), set get, delete, 
    // prototype 1. dataProperty inherit get 2. accessorProperty  inherit get/set
    // extensible 1. no add property 2. no modify prototype 3. no modify extensible
  };

  // reference: property binding [baseValue, referenceName, strictFlag]
  // primitiveReference, baseValue is string|number|boolean|symbol
  // unresolveReference, undefined

  // property Descriptor
  // attribute 特性(普遍存在的固有属性) 定义属性某方面的interal value
  // property 属性|财产(具体依附特定对象的私有属性)
  // https://blog.csdn.net/river_continent/article/details/67639654

  // completion record
  // returnStatement: return normalCompletion(argu)
  // throwStatement: return throwCompletion(argu)
  // abrupt: type ['throw', 'break', 'continue']
  // ?aaa <-> returnifabrupt(aaa)
  function returnifabrupt(argu){
    if(typeof argu == 'abrupt') return argu;
    if(typeof argu == 'complettion') argu = argu.value;
  }

  // interal slot 1. no extend 2. no dynamical add
}

/**
 * 8
 * 
 * envRecord:  record 相关realm的 identifier bing info.
 * outEnvRef:  record
 * lexicalEnv: envRecord的container
 * realm:      
 * 代理包括一组EcmaScript执行上下文、一个执行上下文堆栈、一个正在运行的执行上下文、一组已命名的作业队列、一个代理记录和一个正在执行的线程。
 * 代理群集是通过在共享内存上操作来进行通信的最大代理集。每个代理只属于一个代理集群。
 * 
 */
// execThread执行agent的job时, agent成为surroundAgent
function Agent(){
  return {
    runningExecEnv: null,
    execEnvStack: [], 
    currentRealm: null,
    activeFunctionObj: null,

    jobQueue: {
      scriptQueue: [],
      promiseQueue: [],
    },
    execThread: null,
  };
};

function Job(handler, argument){
  return {
    job: handler, // handle method
    argument,     // data(code)
    realm: agent.currentRealm,
    ScriptOrModule: agent.runningExecEnv.script,
  };
}

function ExecEnv(realm, isFunc, isScript, state){
  return {
    state,
    realm,
    function: isFunc,
    scriptOrModule: isScript,
  };
}

function Realm(){
  return { 
    intrinsic: null, 
    globalObj: undefined, 
    globalEnv: undefined, 
    templateMap: [],
  };
}

function LexicalEnv(envRecord, outerLexRef){ return { envRecord, outerLexRef, }; }

function EnvRecord(){ return {}; }
// 一个ObjectRecor associate with a binding Object
function ObjectRecord(){ return {}; }
function GEnvRecord(){
  return {
    declarativeRecord: {},
    objectRecord: { bind: global, },
    globalThis: global,
    varname: [],
    createMutableBinding(){},   // declarativeRecord
    createImmutableBinding(){}, // declarativeRecord
    createVarBinding(){},       // ObjectRecord.bindObj
    createFunBinding(){},       // ObjectRecord.bindObj
  };
}

// 
function _source(){
  // code is Unicode码点集
  // globalCode: 作为script的source
  // evalCode: 作为script的source
  // moduleCode 模块initialize时直接eval (不包含functionDeclaration/express, arrowFunction, GeneratorDeclaration/express, methodsDefined, classDeclaration/express)
  // FunctionCode: 被解析为[[code]]值的source

  // module classDeclaration/express code is always strict code
  // eval, function 1. use strict 2. in strict code
}

// job完成之前不能启动其他Job

function runJob(){
  initExecEnv();

  if(typeof source == 'script') enqueueJob('scriptJob', scriptEval, source);
  if(typeof source == 'module') enqueueJob('moduleJob', topLevelModuleEval, source);

  while(true){
    // 只有在没有runningExecEnv且execEnvStack为空时，才能启动job的执行。
    suspend(agent.runningExecEnv);
    execEnvStack.pop();

    let nextPending = quene.shift();

    // 每当控制器从与当前运行的执行上下文相关联的可执行代码转入到与该执行上下文无关的可执行代码时，就会创建新的执行上下文。推入堆栈，成为running execution context.
    let execEnv = new ExecEnv(nextPending.realm, null, nextPending.ScriptOrModule);
    execEnvStack.push(agent.runningExecEnv = execEnv);

    let result = nextPending.job();
  }

}

function initExecEnv(){
  let realm = new Realm(),
      execEnv = new ExecEnv(realm, null, null);

  execEnvStack.push(agent.runningExecEnv = execEnv);

  setRealmGlobalObject(realm, global || undefined, this || undefined);
}

function enqueueJob(name, job, argument){
  let queue = agent[`${name}queue`]; 

  queue.push(new Job(job, argument));
}

function setRealmGlobalObject(realm, globalObj, thisValue){
  if(globalObj === undefined) globalObj = { __proto__: realm.intrinsic, __extensible: true, };
  if(thisValue === undefined) thisValue = globalObj;

  realm.globalObj = globalObj;
  realm.globalEnv = new NewGlobalEnvironment(globalObj, thisValue);

  return realm;
}

function NewGlobalEnvironment(globalObj, _this){
  let er = new GEnvRecord();

  er.declarativeRecord = new DeclarationEnvRec();
  er.objectRecord = new ObjectEnvRec(globalObj);
  er.globalThis = _this;
  er.varName = [];

  return new LexicalEnv(er, null);
}

/**
 * 
 * 
 * 
 */
function _statement() {
  // for(leftHandExpress | var identifier | let/const identifier in express) statement
  // for(leftHandExpress | var identifier | let/const identifier in assignmentExpress) statement
  // 1. eval express|assignmentExpress -> value -> create generator|iterator
  // 2. repeat 1. eval|create LexEnv, instantiation -> getRefs 2. initialize|putValue 2.eval statement
}

/**
 * 
 * 15 _script define script|module handle method
 * 
 */

function _script(source){
  function evalJob(){
    // syntaxError 1. lexicalDeclarationNames duplicate
    //             2. any element of lexicalDeclarationNames also in varDeclarationNames
    let res = parseScript(source);

    if(res._errorValue) return reportError(res._errorValue);

    return eval(res);
  }

  function parseScript(sourceText){
    return { realm: agent.runningExecEnv.Realm, environment: null, code: parse(source), }
  }

  function eval(scriptRecord){
    let globalEnv = scriptRecord.realm.globalEnv,
        execEnv = new ExecEnv(scriptRecord.realm, null, scriptRecord.ScriptOrModule);

    execEnv.variableEnv = execEnv.lexicalEnv = globalEnv;

    suspend(runningExecEnv);
    execEnvStack.push(runningExecEnv = execEnv);

    let parseTree = scriptRecord.code;
    let res = globalDeclarationInstantiation(parseTree, globalEnv);

    suspend(runningExecEnv);
    execEnvStack.pop();
    if(execEnvStack.length) resume(runningExecEnv = execEnvStack[execEnvStack.length - 1]);
  }

  function globalDeclarationInstantiation(parseTree, globalEnv){
    // varDeclarationNames | varScopedDeclaration
    //   1. expressStatement|breakStatement|continueStatement|returnStatement|throwStatement|emptyStatement|debuggerStatement -> []
    //   2. variableStatement -> boundNames | variableStatement
    //   3. ifStatement|withStatement|blockStatement|tryStatement -> statement.varDeclarationNames | varScopedDeclaration
    //   4. breakableStatement: 
    //     1.switch while statement.varDeclarationNames | varScopedDeclaration 
    //     2. for(variableStatement) [statement.varDeclarationNames, variableDeclaration.boundName]
    let envRecord = globalEnv.envRecord,
        lexNames = parseTree.lexicalDeclartionNames, 
        // toplevelLexcalDeclarationNames
        // 1. declaration is hoistableDeclaration ? << >> : boundNames 
        // 2. statement: []
        varNames = parseTree.varDeclartionNames,
        // toplevelVarDeclarationName:
        //   1. declaration is hoistableDeclaration ? boundNames : [] 
        //   2. statement 
        //      2.1. labelStatement.toplevelVarDeclarationNames [funcionDeclaration.boundName, statement.varDeclarationName]
        //      2.2. statement.varDeclarationNames
        varDeclaration = parseTree.VarScopedDeclarations,
        funcList = [], funcName = [], varName = [];
        // toplevelVarScopedDeclaration
        //   1. declaration is hoistableDeclaration ? [self] : [] 
        //   2. statement is labelStatement ? [functionDeclaration, statement.varScopeDeclaration] : statement.varScopeDeclaration
        lexDeclaration = parseTree.LexicallyScopedDeclarations;
        // toplevelLexicalScopedDeclaration
        //   1. statement: []
        //   1. declaration is hoistableDeclaration ? << >> : [self] 

    
    lexNames.forEach(name => {
      if(envRecord.hasVarDeclaration(name)) throw new SyntaxError(`${name} was variableStatement|(async)funcDeclaration|GeneratorDeclaration binding`);
      if(envRecord.hasLexicalDeclaration(name)) throw new SyntaxError(`${name} was lexicalDeclaration|classDeclaration binding`);
      if(envRecord.HasRestrictedGlobalProperty(name)) throw new SyntaxError(`${name} was global Object unconfigurable property`);
    });

    varNames.forEach(name => {
      if(envRecord.hasLexicalDeclaration(name)) throw new SyntaxError(`${name} was lexicalDeclaration binding`);
    });

    // init funcList 
    varDeclaration.reverse().forEach(d => {  // the last is use
      let fn = d.boundName;
      if(typeof d == 'hoistableDeclaration' && !funcName.includes(fn)){
        if(!env.CanDeclareGlobalFunction(fn)) throw new TypeError(`${fn}`); // objectRecord没有fn属性且可扩展|objectRecord有fn属性,属性可配置|objectRecord有fn属性且不可配置,属性为数据属性且可写
        funcList.push(d);
        funcName.push(fn);
      }
    });

    // filter varName
    varDeclaration.forEach(d => {
      let vn = d.boundName;
      if(typeof d == 'variableStatement' && !funcName.includes(vn) && !varName.includes(vn)){
        if(!env.CanDeclareGlobalVar(vn)) throw new TypeError(`${fn}`); // objectRecord没有vn属性且可扩展|objectRecord有fn属性
        varName.push(vn);
      }
    });

    // 
    lexDeclaration.forEach(d => {
      d.boundNames.forEach(dn => isConst(d) ? envRecord.createImmutableBinding(dn) : envRecord.createMutableBinding(dn) );
    });
    
    // 1. defineProperty(env.objectRecord, argv[0], argv[1]) 2. env.varName.push(argv[0]) 
    funcList.forEach(v => env.CreateGlobalFunctionBinding(v.boundName, instanceFunction(globalEnv), false));
    
    // 1. env.objEnvRec.createMutableBinding(argv[0]) 2. env.varName.push(argv[0])
    varName.forEach(v => env.CreateGlobalVarBinding(v.boundName, false));
  }
}

// 11 lexical
function _lexical(){
 // code -> input element(贪婪匹配)
  // inputElement space|行终止符|comment|token
  // 行终止符只能在string,templatetoken中
  var el = {
    token,
    whiteSpace: /\uFEFF|\p{White_Space=Yes}/u,
  }

  // token [identifierName, 标点符号, NumberLiteral, StringLiteral, template]
  var token = {
    identifierName,
  }

  /**
   * identifierName: identifierStart identifierContinue [identifier, reservedWord]
   * identifierStart: unicode序列, $, _, unicodeStart
   * identifierContinue: unicode序列, $, unicodeContinue
   * unicodeStart解释: https://www.zhihu.com/question/348324488/answer/857046978
   * 
   * unicode分类 https://unicode.org/cldr/utility/properties.jsp
   * 筛选格式[:ID_Start=Yes:] -> 对应正则\p{ID_Start=Yes} 详细格式说明: http://cldr.unicode.org/unicode-utilities/list-unicodeset
   */
  var identifier = {
    format: [/\p{ID_Start=Yes}|$|_|\\u\d{4,5}/u, /\p{ID_Continue=Yes}|$|\\u\d{4,5}|<zwnj>|<zwj>/u],
  };

  // reservedWord 不能用作标识符的标识符名称。 [keyword, futureReservedWord, NullLiteral, BooleanLiteral]
 
}

// 12
function _express(){
  let primaryExpress = [identifiers, this, literal, /(async)?(funcExpress|generatorExpress)/, classExpress, /\(.*\)/],
      memberExpress = [primaryExpress, /memberExpress(\.identifiersName|\[express\]|`template`)/, /super(\.identifiersName|\[express\])/, /new memberExpress\(assignmentExpress\)/],
      callExpress = [/(super|memberExpress)\(assignmentExpress\)/, /callExpress(\(assignmentExpress\)|\.identifiersName|\[express\]|`template`)/, ],
      newExpress = [memberExpress, /new memberExpress/],
      LeftValueExpress = [callExpress, newExpress],
      // 
      updateExpress = [LeftValueExpress, 'leftValueExpress(++|--)', '++|--Express'],
      unaryExpress = [updateExpress, 'typeof|void|delete|await unaryExpress', '(!|~|++|--|+|-)unaryExpress'],
      // 
      miChengExpress = [unaryExpress, 'updateExpress ** miChengExpress'],
      multiplyExpress = [miChengExpress, 'multiplyExpress *|/|% miChengExpress'],
      addExpress = [multiplyExpress, 'addExpress +|- multiplyExpress'],
      shiftExpress = [addExpress, 'shiftExpress <<|>>|>>> addExpress'],
      relationExpress = [shiftExpress, 'relationExpress >|>=|<|<=|in|instanceof shiftExpress'],
      equalExpress = [relationExpress, 'equalExpress ==|!=|===|!== relationExpress'],
      bitwiseANDExpress = [equalExpress, 'bitwiseANDExpress & equalExpress'],
      bitwiseXORExpress = [bitwiseANDExpress, 'bitwiseXORExpress ^ bitwiseANDExpress'],
      bitwiseORExpress = [bitwiseXORExpress, 'bitwiseORExpress | bitwiseXORExpress'],
      logicalANDExpress = [bitwiseORExpress, 'logicalANDExpress && bitwiseORExpress '],
      logicalORExpress = [logicalANDExpress, 'logicalORExpress || logicalANDExpress'],
      // 
      conditionExpress = [logicalORExpress, 'conditionExpress ? assignmentExpress : assignmentExpress'],
      //
      assignmentExpress = [conditionExpress, arrowFunc, asyncArrowFunc, 'leftValueExpress +|-|*|/|%|**|>>|<<|>>>|&|^||= assginmentExpress'],
      // 
      spread = `...assignmentExpress`;
      // 
      express = [assignmentExpress, 'express , assignmentExpress'];
}

function _declartion(){
  let blockStatement = '{ (statment|decartion)* }',
      tryStatement = `try ${blockStatement} (catch((identifiers|bindindPattern))? ${blockStatement})? (finally ${blockStatement})?`,

      labelStatement = /identifiers:(statement|FunctionDeclartion)*/,

      ifStatement = 'if(express) statement (else statement)?',
      withStatement = `with(express) statement`,
      breakStatement = /break(identifiers)?;/, continueStatement = /continue(identifiers)?;/,
      throwStatement = `throw express;`, returnStatement = `return (express)? ;`,
      breakableStatement = [
        `switch(express){ case express:(statement|declartion), default:(statement|declartion) }`, 
        `(?do statement)? while(express) (statement)?`,
        `for (varStatement|lexicalDeclartion; express; express) statement`,
        `for(await)? (var|let|const identifiers|bindingPattern (in express)|(of assignmentExpress)) statement`,
      ], 

      propertyName = [`identifierNmme`, `string|numberLiteral`, `[assignmentExpress]`],
      bindingEle = `(identifiers|bindingPattern)(initializer)?`,
      bindingPattern = [
        /\{ ( (identifiers (initializer)?) | (propertyName:bindingEle) | (\.\.\.identifiers) )* \}/, 
        /\[ ( (bindingEle) | (\.\.\.(identifiers|bindingPattern)) )* \]/
      ],
      variableStatement = 'var identfiiers|bindingPattern (initializer)?', // initializer: = assignmentExpress

      statement = [
        variableStatement, 
        labelStatement,
        blockStatement, tryStatement, 
        ifStatement, withStatement,
        breakableStatement, 
        breakStatement, continueStatement, returnStatement, throwStatement, emptyStatement, debuggerStatement],
      hositableDeclaration = [Func, Generator, asyncFunc, asyncGenerator],
      lexicalDeclaration = ['let', 'const'],
      declaration = [hositableDeclaration, lexicalDeclaration, classDeclaration];

  function _lexicalEval(){
    function resolveBinding(){

    }
  }
}

function _FunAndClass(){ // 14
  let funDeclartion = /(async)? function \*? identifiers \( (bindingEle|(\.\.\.(identifiers|bindingPattern) ))* \)\{ (statement|declartion)* \}/,
      funExpress = /(async)? function \*? (identifiers)? \( (bindingEle|(\.\.\.(identifiers|bindingPattern) ))* \)\{ (statement|declartion)* \}/,
      method = /(async)? (get|set|\*)? propertyName\( (bindindEle|(\.\.\.(identifiers|bindindPattern) ))* \)\{ (statement|declartion) \}/,
      arrowFun = /(async)? (identifiers|\(...\)) => (assignmentExpress|\{ (statement|declartion)* \})/,
      classDeclartion = /class identifiers (extends leftValueExpress)? \{ ((static)? methods)* \}/,
      classExpress = /class (identifiers)? (extends leftValueExpress)? \{ ((static)? methods)* \}/;

}

function _scriptAndModule(){ // 15
  let scirpt = null,
      module = /(importDeclartion|exprotDeclartion|statement|declartion)*/;
}



/**
 * 
 */
function _standard(){
  
}
// _standard();

/**
 * 
 * #engine
 * render, js引擎 https://blog.csdn.net/qq_36771997/article/details/74370297
 * 主流浏览器内核及JS引擎 https://www.php.cn/js-tutorial-354085.html
 * 开源 https://www.oschina.net/project/tag/296/javascript-engine
 * 
 * javaScriptCore(webkit默认内嵌引擎 2008年升级为SquirrelFish)
 * jsCore https://www.cnblogs.com/meituantech/p/9528285.html
 * 深入了解webkit内核第一篇 https://www.cnblogs.com/lonelyonline/p/4380272.html
 * JavaScriptCore解析 https://blog.csdn.net/horkychen/article/details/8915907
 * 
 * rhino(mozilla, java)
 * SpiderMonkey(mozilla)
 * 
 * Nitro(apple, 基于jsCore)
 * 
 * v8(google, c++)
 * v8基础分析 https://blog.csdn.net/qq_30638831/article/details/90552912
 * V8引擎的内部结构 https://juejin.im/post/5d2d20f35188253b636b67aa
 * 认识v8 https://zhuanlan.zhihu.com/p/27628685
 * typeof 与 Javascript 类型源码分析 https://zhuanlan.zhihu.com/p/143590829
 * 
 * jScirpt(microSoft IE8)
 * Chakra(microSoft IE9+)
 * 
 * Hermes(facebook)
 * 
 * quickjs(c)
 * Fabrice Bellard介绍 https://blog.csdn.net/gatieme/article/details/44671623
 * 官网 https://bellard.org/quickjs/
 * 
 */


/**
 * 
 * Browser
 * 
 * 
 * chrome
 * 任务管理器快捷键: shift + esc
 * timing解释: https://blog.csdn.net/qq_20881087/article/details/56682525
 * 
 * 浏览器渲染原理:  https://blog.csdn.net/wjnf012/article/details/83060320
 * 浏览器工作原理简介（转） https://www.cnblogs.com/zhuanzhuruyi/p/6496276.html
 * 
 * chromium framework
 * 
 * 1. caller layer:    内部调用者包括Chromium浏览器、 Content Shell等、外部包括 CEF (Chromium Embedded Framework)、Opera 浏览器等。
 *    “Chromium 浏览器” 和 ”Content Shell“ 是构建在 Content API 之上的两个 ”浏览器“，
 *     Chromium具有浏览器完整的功能，也就是我们编译出来能看到的浏览器式样。
 *    ”Content Shell“ 是Content API包装的一层简单的”壳“，也是一个简单的”浏览器“，可以使用Content模块来渲染和显示网页内容。可以用来测试 Content 模块很多功能的正确性，例如渲染、硬件加速等。
 * 2. interface layer: Content 模块 || Content API 将下面的渲染机制。安全机制和插件机制等隐藏起来，提供一个接口层。被上层模块或者其他项目使用，
 *    ”Content 模块”这里指用来渲染内容的模块。如果没有 Content 模块，浏览器的开发者也可以在WebKit的 Chormium 移植上渲染网页内容，但是没有办法获得沙箱模型。跨进程的 GPU 硬件加速机制等功能，因为这些功能 很多是在 Content 层里面实现的。
 * 
 * Browser进程：浏览器的主进程，负责浏览器界面的显示、各个页面的管理、是所有其他类型进程的祖先、负责它们的创建和销毁等工作，有且仅有一个。
 *   1. 根据内存中的Bitmap绘制
 *   1. UI线程（Browser进程中的主线程）
 * Renderer进程：负责页面渲染，Blink/WebKit的渲染工作主要在这个进程中完成，可能有多个，默认每个页面一个, Renderer进程数量与网页数量不一定一致，
 *   生成Bitmap,共享给browser进程
 * GPU进程：最多只有一个，当且仅当GPU硬件加速打开的时候才会被创建，主要用于对 3D 图形加速调用的实现。
 * 插件进程：NPAPI插件进程, Pepper插件进程
 * 
 * user操作 -> ui线程处理 -> io线程处理(browser进程) <-- RendererHost接口 --> io线程(Renderer进程) -> 渲染线程(Renderer进程)
 * 
 * WebKit内核 https://blog.csdn.net/ch834301/article/details/82228319
 * WebKit内核源代码分析 https://blog.csdn.net/dlmu2001/article/category/741748
 * 浏览器内核分析 https://blog.csdn.net/u013510838/article/category/6726259
 * WEBKIT内核源码分析系列 https://www.cnblogs.com/qq499194341/articles/2891954.html
 * WEBKIT基础 https://www.cnblogs.com/qq499194341/category/453133.html
 * webkit-132 https://blog.csdn.net/liumf2005/article/details/8736124
 * 
 * Brave浏览器  https://blog.csdn.net/qq_37746973/article/details/83307806
 * Tor网络突破IP封锁  https://www.cnblogs.com/nuolan/p/5729650.html
 * 关于Tor比较全面的讲解  https://blog.csdn.net/bjzhaoxiao/article/details/81458061
 * 
 */

/**
 * 
 * 关于HTML里图片默认间隙问题:  https://www.jianshu.com/p/e329b2294b4c
 * 
 */

/**
 * 
 * complier
 * Parsing Techniques 读书笔记（一）:  https://www.jianshu.com/p/d061fa662a25
 * wasm: https://segmentfault.com/blog/yunhuangbeiqing
 * JS实现JS编译器: https://zhuanlan.zhihu.com/p/44000019
 * 前端要以正确的姿势学习编译原理  https://zhuanlan.zhihu.com/p/36301857
 * JavaScript 解析器相关资料 AST Parser。。。  https://my.oschina.net/meizhitu/blog/94758
 * 百度搜：ASTparser traverse stringify
 */

/**
 * 
 * 计算的本质 http://www.java1234.com/a/javabook/javabase/2015/1219/5400.html
 * 
 */