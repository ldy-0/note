let proto = Symbol('prototype'),
    extensible = Symbol('Extensible');

function createObject(proto, list = []){
  // defineProperty, getOwnProperty,
  // setPrototypeOf, getPrototypeOf, isExtensible, preventExtension, get, set, hasProperty, delete,
  let obj = {
    _proto: Object.prototype,
    _extensible: true,
  };

  return obj;
}

// 

// 是否为属性名
function isPropertyKey(s){ return typeof s === 'string' || typeof s === 'symbol'; }

function isCallable(o){ return typeof o == 'object' && o._call; }
function isConstructor(o){ return typeof o === 'object' && o._construct; }

// 
function ToPrimitive(val, hint){
  if(hint === 'undefined') hint = 'default';

  if(typeof val == 'object' && val !== null){
    if(typeof val[Symbol.toPrimitive] == 'function'){
      let v = val[Symbol.toPrimitive]();

      if(typeof v === 'object' && v !== null) throw new TypeError('return value must be a primitive type');

      return v;
    }

    if(hint === 'default') hint = 'number';
    let arr = typeof hint == 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];

    for(let i = arr.length - 1; i >= 0; i--){
      if(typeof val[arr[i]] === 'function'){
        let v = val[arr[i]]();
        if(typeof v !== 'object') return v;
      }
    }

    throw new TypeError('');
  }

  return val;
}

function ToObject(o){
  let arr = ['boolean', 'string', 'number', 'symbol'],
      type = typeof o;

  if(o == null) throw new TypeError('');

  return arr.indexOf(type) !== -1 ? { [`_${type}Data`]: o } : o;
}

function ToString(){

}

function ToBoolean(v){
  if(v == null)                                     return false; 
  if(typeof v == 'boolean' && !v)                   return false;
  if(typeof v == 'string' && v.length === 0)        return false;
  if(typeof v == 'number' && (isNaN(v) || v === 0)) return false;

  return true;
}

function ToNumber(n){
  if(typeof n == 'symbol') throw new TypeError('symbol no convert');

  if(n === undefined) return NaN;
  if(n === null) return 0; 
  if(typeof n == 'boolean') return n ? 1 : 0;
  if(typeof n == 'number') return n;
  if(typeof n == 'string') return Number(n);// parse
  if(typeof n == 'object') return ToNumber(ToPrimitive(n));
}

function ToInteger(n){
  n = ToNumber(n);

  if(n !== n) return +0;

  if(n == 0 || n == Infinity || n == -Infinity) return n;

  return Math.trunc(n);
}

// Positive Safe Integer 
function ToLength(n){
  n = ToInteger(n);

  if(n <= +0) return +0;

  if(n > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;

  return n;
}

// valid Range
function ToIndex(n){
  if(n === undefined) return +0;

  let positiveSafeInteger = ToLength(n);
  if(n < 0 || !sameValueZero(ToInteger(n), positiveSafeInteger)) throw new RangeError('range invalid');

  return positiveSafeInteger;
}

function ToUint8(n){
  n = ToNumber(n);

  if(n !== n || n == 0 || n == Infinity || n == -Infinity) return +0;

  n = Math.trunc(n);
  return n % 2 ** 8;
}

function toUint32(x){
  x = Number(x);  
  
  if(isNaN(x) || x === 0 || x === Infinity || x === -Infinity) return 0;

  x = Math.trunc(x);

  return x % 2 ** 32;
}

function toInt32(x){
  x = Number(x);

  if(isNaN(x) || x === 0 || x === Infinity || x === -Infinity) return 0;

  x = Math.trunc(x);

  return x >= 2 ** 31 ? x - 2 ** 32 : x;
}

function ToPropertyKey(v){
  v = toPrimitive(v);

  return typeof v === 'symbol' ? v : toString(v);
}

function ToPropertyDescriptor(v){
  let desc = new Descriptor();
  if(typeof v !== 'object') throw new TypeError('');

  if(v.hasOwnProperty('configurable')) desc._configurable = ToBoolean(v.configurable);
  if(v.hasOwnProperty('enumerable')) desc._enumerable = ToBoolean(v.enumerable);
  if(v.hasOwnProperty('value')) desc._value = ToBoolean(v.value);
  if(v.hasOwnProperty('writable')) desc._writable = ToBoolean(v.writable);

  if(v.hasOwnProperty('set')){
    if(v.set !== undefined && !isCallable(v.set)) throw new TypeError('');
    desc._set = v.set;
  }

  if(v.hasOwnProperty('get')){
    if(v.get !== undefined && !isCallable(v.get)) throw new TypeError('');
    desc._get = v.get;
  }

  return desc;
}

/**
 * 
 * 
 * 
 */
function relation(x, y, isLeft = true){
  if(isLeft){
    x = toPrimitive(x);
    y = toPrimitive(y);
  }else{
    y = toPrimitive(y);
    x = toPrimitive(x);
  }

  if(typeof x == 'string' && typeof y == 'string'){
    if(isStringPrefix(y, x)) return false;  
    if(isStringPrefix(x, y)) return true;
    let i = 0;
    while(x[i] === y[i]) i++;

    x.charCodeAt(i) < y.charCodeAt(i) ? true : false;
  }else{
    x = ToNumber(x);
    y = ToNumber(y);
    if(isNaN(x) || isNaN(y)) return undefined;
    if(x === y) return false;
    if(x === Infinity) return false;
    if(y === Infinity) return true;
    if(y === -Infinity) return false;
    if(x === -Infinity) return true;
    return x < y ? true : false;
  }
}

function sameValueZero(n1, n2){
  if(typeof n1 !== typeof n2) return false;

  if(typeof n1 == 'number'){
    if(n1 !== n1 && n2 !== n2) return true;

    if(n1 === n2 === 0) return true;

    return n1 === n2;
  }

  return sameValueNoNumber(n1, n2);
}

function sameValue(n1, n2){
  if(typeof n1 !== typeof n2) return false;

  if(typeof n1 == 'number'){
    if(n1 !== n1 && n2 !== n2) return true;

    if(n1 === n2 === 0 && Object.is(n1, n2)) return false;

    return n1 === n2;
  }

  return sameValueNoNumber(n1, n2);
}

function abstractEqual(n1, n2){
  let arr = ['string', 'number', 'symbol'];

  if(typeof n1 === typeof n2) return strictEqual(n1, n2);

  if(typeof n1 === 'undefined' && typeof n2 === 'null' || typeof n1 === 'null' && typeof n2 === 'undefined') return true;

  if(typeof n1 === 'boolean') return abstractEqual(ToNumber(n1), n2);
  if(typeof n2 === 'boolean') return abstractEqual(ToNumber(n2), n1);

  if(typeof n1 === 'number' && typeof n2 === 'string') return abstractEqual(n1, ToNumber(n2));
  if(typeof n2 === 'number' && typeof n1 === 'string') return abstractEqual(n2, ToNumber(n1));

  if(typeof n1 === 'object' && arr.indexOf(typeof n2) !== -1) return abstractEqual(ToPrimitive(n1), n2);
  if(typeof n2 === 'object' && arr.indexOf(typeof n1) !== -1) return abstractEqual(ToPrimitive(n2), n1);

  return false;
}

function strictEqual(n1, n2){
  if(typeof n1 !== typeof n2) return false;

  if(typeof n1 === 'number'){
    if(n1 !== n1 || n2 !== n2) return false;

    if(n1 === n2 === 0) return true;

    return n1 === n2;
  }

  return sameValueNoNumber(n1, n2);
}

function sameValueNoNumber(n1, n2){
  if(typeof n1 == 'undefined') return true;

  if(typeof n1 === 'string')  return 'codeUnit相等';
  if(typeof n1 === 'boolean') return n1 === n2;
  if(typeof n1 === 'symbol')  return 'symbol值相等';
  if(typeof n1 === 'object') return '是否指向同一个对象';
}

module.exports = {
  ToPrimitive,
  ToObject,
  ToBoolean,
  ToNumber,

  ToInteger,
  ToLength,
  ToIndex,
  ToUint8,

  ToPropertyKey,
  ToPropertyDescriptor,
}