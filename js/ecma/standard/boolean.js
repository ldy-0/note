/**
 * 
 * boolean Object: an ordinary object with _booleanData.
 * boolean instance Object: an ordinary object with _booleanData prototype, _prototype is Boolean.prototype
 * 
 */

function Bool(v){
  v = toBoolean(v);

  if(!Boolean.prototype.isPrototypeOf(this)) return v;

  return { _booleanData: v };
}

Bool.prototype = Object.create(Object.prototype, {
  _booleanData: { value: false },
  
  valueOf: { value: booleanValue, },
});

Bool.prototype.toStrig = function(){ return this.valueOf() ? 'true' : 'false'; }

function booleanValue(){
  let typeStr = 'boolean';

  if(typeof this == typeStr) return this; 

  if(typeof this == 'object' && this.hasOwnProperty('_booleanData') && typeof this._booleanData === typeStr) return this._booleanData;

  throw new TypeError('');
}


/**
 * 
 * 
 * 
 */

// { key: null, symbol: null },
let globalSymbolRegistry = [];

function Symbo(v){
  if(Symbo.prototype.isPrototypeOf(this)) throw new TypeError('');

  v === undefined ? undefined : toString(v);

  return { _symobleData: Math.random(), _description: v };
}

Object.defineProperties(Symbo, {
  'prototype': { value: Symbol.prototype, },
  'iterator': {},
  'asyncIterator': {},
  'toPrimitive': {}, 
  'toStringTag': {},

  for: { value: SymbolFor, },
  keyFor: { value: SymbolKeyFor, },
});

function SymbolFor(key){
  let newSymbol;
  key = toString(key);

  if(globalSymbolRegistry.some(v => sameValue(v.key, key) ? newSymbol = v.symbol : false){
    newSymbol = { _symobleData: Math.random(), _description: key };
    globalSymbolRegistry.push({ key, symbol: newSymbol, });
  }

  return newSymbol;
}

function SymbolKeyFor(sym){
  let key;
  if(typeof sym !== 'symbol') throw new TypeError('');

  globalSymbolRegistry.some(v => sameValue(v.symbol, sym) ? key = v.key : false);

  return key;
}

Symbo.prototype = Object.create(Object.prototype, {
  [Symbol.toStringTag]: { value: 'Symbol', configurable: true, },
  [Symbol.toPrimitive]: { value: symbolValue, configurable: true, },
  description: { get(){ return this.valueOf()._description; } },

  valueOf: { value: symbolValue },
});
Symbo.prototype.toString = function(){
  let v = this.valueOf();

  return `Symbol(${v.description || ''})`;
}

function symbolValue(v){
  if(typeof this === 'symbol') return this;
  
  if(typeof this === 'object' && this.hasOwnProperty('_symobleData') && typeof this._symobleData === 'symbol') return this._symobleData; 

  throw new TypeError('');
}


/**
 * 
 */
function Err(msg){
  // FIXME:
  // if(!Error.prototype.isPrototypeOf(this)) this
  let o = { _errorData: null, };

  if(msg !== undefined) Object.defineProperty(o, 'message', { value: toString(msg), configurable: true, writable: true, });

  return o;
}

Err.prototype = Object.create(Object.prototype, {
  name: { value: 'Error', },
  message: { value: '' },
});
Err.prototype.toString = function(){
  if(typeof this !== 'object') throw new TypeError('');
  let name = this.name ? toString(this.name) : 'Error',
      msg = this.message ? toString(this.message) : '';

  if(!msg.length) return name;
  return `${name}:${msg}`;
}


module.exports = {
  Bool,
  Symbo,
  Err,
}