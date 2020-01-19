const _type = require('../lib/type');

/**
 *
 * JSON
 * ordinary object
 * data interchange format: ECMA-404
 *
 */

let JS = {
  __proto__: Object.prototype,
};

JS.parse = function(value, reviver){
  let script = `(${value});`,
      result = resolve(script)._value; 
  
  return isCallable(reviver) ? parse({ '': result }, '') : result;

  function parse(holder, key){
    let v = holder[key];

    if(typeof v === 'object'){
      let aItem = Array.isArray(v) ? v : Object.keys(v);

      aItem.forEach((k, i) => {
        let vk  = Array.isArray(v) ? _type.toLength(i) : k,
            res = parse(v, vk);

        res === undefined ? delete v[vk] : createDataProperty(v, vk, p);
      });
    }

    return reviver.call(holder, key, v);
  }
}

JS.stringify = function(value, replace, space){
  let stack = [],
      ident = '',
      fn, list;

  if(typeof replace == 'function') fn = replace;
  if(Array.isArray(replace)){
    let i = 0;
    list = [];

    while(i++ < replace.length){
      let item = replace[i], v;
      if(typeof item == 'number') v = String(item);
      if(typeof item == 'object' && (item.hasOwnProperty('_numberData') || item.hasOwnPropertyName('_stringData'))) v = String(item);

      if(v !== 'undefined' && !list.includes(v)) list.push(v);
    }
  }

  if(typeof space == 'object'){
    if(item.hasOwnProperty('_numberData ')) space = item._numberData;
    if(item.hasOwnProperty('_stringData'))  space = item._stringData;
  }
  if(['number', 'string'].indexOf(typeof space) !== -1) space = '\u0020'.repeat(Math.max(Math.min(10, _type.ToInteger(space)), 1));

  let wrapper = { '': value, }; // createDataProperty(wrapper, '', value)
  return serialize('', wrapper); 

  function serialize(key, holder){
    let v = holder[key];
    
    // Date.prototype.toJSON
    if(typeof v == 'object' && typeof v.toJSON == 'function') v = v.toJSON.call(v, key);

    if(fn) v = fn.call(holder, key, v);

    if(typeof v == 'object'){
      if(item.hasOwnProperty('_numberData '))  v = item._numberData;
      if(item.hasOwnProperty('_stringData'))   v = item._stringData;
      if(item.hasOwnProperty('_booleanData'))  v = item._booleanData;
    }

    if(v === null)  return 'null';
    if(v === true)  return 'true';
    if(v === false) return 'false';
    if(typeof v == 'number') return isFinite(v) ? _type.ToNumber(v) : 'null';
    if(typeof v == 'string') return quoteString(v);
    if(typeof v == 'object') return serializeObject(v, Array.isArray(v));
    // Function undefined Symbol ignore
    return undefined;
  }

  function serializeObject(o, isArray){
    let str = '',
        ide = ident + space;
    // cyclial error
    if(stack.some(v => v == o)) throw new TypeError('cyclial');
    stack.push(o);

    let aItem = [];
    if(isArray){
      let i = 0;

      while(i < _type.toLength(o.length)){ let v = serialize(i, o); aItem.push(v === undefined ? 'null' : v); i++; }
    }else{
      let aProperty = list || Object.getOwnPropertyNames(o);

      aProperty.forEach(k => { let v = serialize(k, o); if(v !== undefined) aItem.push(`${k}:\u0020${v}`); });
    }
    
    // RegExp: {} and __proto__: Object.prototype
    if(isArray) str = aItem.length ? space ? `[\u000a${ide}${aItem.join(',\u000a' + ide)}\u000a${ident}]` : `[${aItem.join(',')}]` : `[]`;
    else        str = aItem.length ? space ? `{\u000a${ide}${aItem.join(',\u000a' + ide)}\u000a${ident}}` : `{${aItem.join(',')}}` : '{}';

    stack.pop();
    return str;
  }
  
}

function quoteString(v){
  let str = '\u0022',
      map = {
        0x000a: '\n',
        0x000d: '\r',
        0x0022: '\"',
        0x005c: '\\',
      };
  
  for(let i = 0, len = v.length; i < len; i++){
    let unit = v.charCodeAt(i);

    if(map[unit])                                              str += map[unit];
    else if(unit < 0x0020 || (unit > 0xd800 && unit < 0xdfff)) str += `\\u${(unit.toString(16).length  == 2 ? '00' : '') + unit.toString(16)}`;
    else                                                       str += utf16encode(unit);
  }

  str += '\u0022';
  return str;
}


function Uint8Array(len, offset, arraylength){
  if(!Uint8Array.prototype.isPrototypeOf(this)) throw new TypeError('');

  // ordinary object _typedArrayName _arrayLength
  return allocateTypedArray('Uint8Array', toIndex(len));
}

function TypedArray(){

}

TypedArray.prototype = Object.create(Object.prototype, {
  constructor: { configurable: true, enumerable: true, value: TypedArray, writable: true, },
  buffer: { get: () => get('dataView', 'viewedArrayBuffer') },
  byteOffset: { get: () => get('dataView', 'byteOffset') },
  byteLength: { get: () => get('dataView', 'byteLength') },
});


function get(valid, property){
  if(typeof this !== 'Object' || !this[valid]) throw new TypeError('');

  return this[property];
}


module.exports = {

}
