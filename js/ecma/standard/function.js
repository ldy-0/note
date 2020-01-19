/**
 * 
 * functionDeclaration: 1. function identifier(param){ statementList } 2. function (param){ statementList }(只在export default)
 * 
 * function constructor
 * function instance: length|name
 * 
 * dynamic evaluation code
 * strict(non-strict) function: code is strict(non-strict).
 * 
 * _this: 
 * _environment: en when define
 * 
 * 
 */
function FO(source, code, param, kind, strict, scriptOrModule, realm, env, _thisMode, proto, extensible){
  return {
    _prototype: proto || Function.prototype,
    _extensible: extensible,

    _source: source,
    _code: code,
    _param: param,

    _kind: kind,                     // normal | generator | async | async generator | classConstructor
    _strict: strict,
    _scriptOrModule: scriptOrModule,

    _realm: realm,
    _env: env,
    _thisMode,
    
  };
}

function FunRecord(_this, _thisMode, f, newTarget){
  return {
    _this,
    _thisMode,
    funObj: f,
    newTarget,
  };
}

function FunEnv(F){ return new LexicalEnv(new FunRecord(undefined, 'uninit', F), F._env); }

function instanceFunction(env){
  let rex = agent.runngingExecCtx,
      f = new FO(source, body, param, 'normal', strict, rex ? rex.scriptOrModule || null : null, agent.currentRealm, env, isArrow ? 'lexical' : strict ? 'strict' : 'global');

  f._defineOwnProperty('length', new Descriptor({ configurable: true, enumerable: false, writable: false, value: param.length }));
  f._defineOwnProperty('name', new Descriptor({ configurable: true, enumerable: false, writable: false, value: name ? (typeof name === 'symbol' ? `[${name.description}]` : `${name}`) : 'default' }));
}

// eval
function _call(_this, argus){
  let callerExecCtx = agent.runngingExecCtx,
      calleeExecCtx = new ExecEnv(this.realm, this, this.scriptOrModule);

  calleeExecCtx.varEnv = calleeExecCtx.lexicalEnv = new FunEnv(this);

  suspend();
  agent.ExecContextStack.push(calleeExecCtx);

  // bind this
  let thisValue;
  if(this._thisMode === 'strict'){
    thisValue = _this; 
  }else if(this._thisMode === 'global'){
    thisValue = thisValue == null ? calleeExecCtx.realm._globalEnv._this : toObject(thisValue);
  }
  if(thisValue) calleeExecCtx.lexicalEnv._this = thisValue;

  instanceDeclaration(this, calleeExecCtx);
 
  agent.ExecContextStack.pop();
  resume();
}

function instanceDeclaration(f, calleeExecCtx){
  let env = calleeExecCtx.lexicalEnv,
      records = env.envRecords,
      param = f._source.paramList,
      paramNames = f._source.paramName,
      varNames = f._source.varDeclaredName,
      varDeclaration = f._source.varScopedDeclaration;

  varDeclaration.reverse().forEach(v => {
    if(v.type === 'hoistable' && functionName.includes(v.name)){
      functionName.unshift(v.name);
      functionList.unshift(v);
    } 
  });

  let needArguments = true;
  if(f._thisMode === 'lexical' 
      || param.includes('arguments') 
      || (!hasParamExpress && (functionName.includes('arguments') || lexicalName.includes('arguments')))) needArguments = false;

  paramNames.forEach(v => { records.hasBinding(v) ? records.createMutableBinding(v) : records.initBinding(v, undefined); });

  if(needArguments){
    let o = f._strict ? createArgumentsObject() : createMapArgumentObject();
    f._strict ? records.createImmutableBinding('arguments') : records.createMutableBinding('arguments');
    records.initBinding('arguments', o);
    paramNames.push('arguments'); 
  }

  let instancedNames = copy(paramNames);
  if(!hasParamExpress){
    varNames.forEach(v => {
      if(!instancedNames.includes(v)){
        instancedNames.push(v);
        records.createMutableBinding(v);
        records.initBinding(n, undefined);
      }
    });
  }else{
    calleeExecCtx.varEnv = new DeclarationEnv(env);
    let records = calleeExecCtx.varEnv.envRecords;

    varNames.forEach(v => {
      if(!instancedNames.includes(v)){
        instancedNames.push(v);
        records.createMutableBinding(v);
        records.initBinding(v, (!paramNames.includes(v) && !functionName.includes(v)) ? undefined : calleeExecCtx.lexicalEnv.getBinding(v));
      }
    });
  }

  if(!f._strict){
    // blockStatement|caseStatement|defaultStatement
    functionDeclaration.forEach(v => {}); 
  }

  let lexicalEnv = f._strict ? calleeExecCtx.varEnv : new DeclarationEnv(calleeExecCtx.varEnv);
  calleeExecCtx.lexicalEnv = lexicalEnv;
  
  lexicalDeclaration.forEach(v => {
    isConst ? lexicalEnv.createImmutableBinding(v.name) : lexicalEnv.createMutableBinding(v.name); 
  });

  functionList.forEach(v => calleeExecCtx.varEnv.setMutableBinding(v.name, instanceFunction(lexicalEnv)));
}

function F(){

}

/**
 * 
 * 
 */
F.prototype = Object.create(Object.prototype, {
  '_call': { configurable: false, enumerable: false, writable: false, },
});

F.prototype.toString = function(){
  let f = this,
      obj = ['object', 'function'];

  if(obj.indexOf(typeof f) !== -1 && f !== null && f._sourceText) return f._sourceText;
  if(isCallable(f)) return `function ${f.name}(){ [ native code ] }`;

  throw new TypeError('');
}

F.prototype.call = function(_this, ...argus){
  if(!isCallable(this)) throw new TypeError('');
 
  preTailCall();

  this._call(_this, argus);
}

F.prototype.apply = function(_this, arr){
  if(!isCallable(this)) throw new TypeError('');

  if(arr == null) arr = [];
  if(typeof arr !== 'object') throw new TypeError('');

  preTailCall();

  this._call(_this, arr);
}

F.prototype.bind = function(_this, ...argus){

}

function preTailCall(){
  let leaf = agent.runningExecContext;

  suspend();
  agent.ExecContextStack.pop();
}

module.exports = F;

Object.assign = function(obj, ...argu){
  obj = toObject(obj);

  argu.forEach(o => {
    if(o != null){
      o = toObject(o); 

      o.ownPropertyKeys().forEach(v => {
        obj._set(k, o._get(v));
      });
    }
  });
}