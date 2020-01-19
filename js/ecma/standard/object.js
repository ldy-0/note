/**
 * 
 * 
 */
function _getPrototypeOf(){ return this._prototype; }
function _setPrototypeOf(o){
  let proto = this._prototype,
      extensible = this._extensible;
  
  if(sameValue(o, proto)) return true;
  if(!extensible) return false;

  let p = o, done = false;
  while(!done){
    if(p == null)               done = true
    else if(sameValue(p, this)) return false
    else                        p = p._prototype;
  }

  return this._prototype = o;
}
function _isExtensible(){ return this._extensible; }
function _preventExtensions(){ return this._extensible = false, true; }

function _getOwnProperty(k){
  // if(this is not k) return undefined;

  // let current = this object 键值为k的属性
  let D = new Descriptor();

  // if(current is dataProperty) copy(D, current, ['value', 'writable'])
  // if(current is accessorProperty) copy(D, current, ['set', 'get'])
  // copy(D, current, ['configurable', 'enumerable'])
   
  return D;
}

function _defineOwnProperty(p, desc){
  let currentDesc = this._getOwnProperty(p),
      isExtensible = this._isExtensible(); 

  if(!currentDesc){
    if(!isExtensible) return false;

    isDataDescription(desc) || isGenerticDescription(desc) ? copy(desc, ['value', 'writable', 'configurable', 'enumerable']) : copy(desc, ['get', 'set', 'configurable', 'enumerable']);
    return true;
  }

  if(!currentDesc.configurable){
    if(desc.configurable || currentDesc.enumerable !== desc.enumerable) return false; 
  }

  if(isDataDescription(currentDesc) && isDataDescription(desc)){
    if(!currentDesc.configurable && !currentDesc.writable){
      if(desc.writable || sameValue(currentDesc.value, desc.value)) return false; 
      return true;
    }
  }else if(isAccessorDescription(currentDesc) && isAccessorDescription(desc)){
    if(!currentDesc.configurable){
      if(!sameValue(currentDesc.get, desc.get) || !sameValue(currentDesc.set, desc.set)) return false;
      return true;
    }
  }else if(isDataDescription(currentDesc) !== isDataDescription(desc)){
    if(!currentDesc.configurable) return false;
    if(isDataDescription(currentDesc)){
      // configurable|enumerable use currentDesc, set|get use default value;
    }else{
      // configurable|enumerable use currentDesc, value|writable use default value;
    }
  } 

  // clone(o, desc);
  return true; 

}

function _ownPropertyKeys(){
  let list = [];
  
  // 自身所有array index property.forEach(v => { list.push(v) });
  // 自身所有stirng type property(不含array index属性).forEach(v => { list.push(v) });
  // 自身所有symbol property.forEach(v => { list.push(v) });

  return list;
}

function _hasProperty(k){
  if(!isPropertyKey(k)) throw new TypeError('');

  let desc = this._getOwnProperty(k);

  if(desc === undefined){
    let parent = this._getPrototypeOf();
    return parent === null ? false : parent._hasProperty(k);
  }

  return true;
}

function _get(k, _this){
  let desc = this._getOwnProperty(k);

  if(desc === undefined){
    let parent = this._getPrototypeOf();
    if(parent === null) return undefined;
    return parent._get(key, _this);
  }

  if(isDataDescription(desc)) return desc._value;
  if(isAccessorDescription(desc)) return desc.get === undefined ? undefined : desc.get.call(_this);
}

function _set(k, v, _this){
  let desc = this._getOwnProperty(k);

  if(desc === undefined){
    let parent = this._getPrototypeOf();
    if(parent === null) desc = new Descriptor({ value: undefined, configurable: true, enumerable: true, writable: true, })
    else                return parent._set(k, v, _this);
  }

  if(isDataDescription(desc)){
    if(!desc.writable || typeof _this !== object || _this === null) throw new TypeError('');
    let thisDesc = _this._getOwnProperty(k);

    if(thisDesc === undefined) return _this._defineOwnProperty(k, new Descriptor({ value: v, configurable: true, enumerable: true, writable: true, }));
    else{
      return _this._defineOwnProperty(k, new Descriptor({ value: v, }));
    }
  }

  if(desc.set === undefined) throw new TypeError('');
  else                       desc.set.call(_this, v);

}

function fromDescriptor(desc){
  if(desc === undefined) return undefined;

  let o = { _prototype: Object.prototype };

  if(desc._configurable) o._defineOwnProperty('configurable', new Descriptor({ value: desc._configurable, configurable: true, enumerable: true, writable: true, }));
  if(desc._enumerable)   o._defineOwnProperty('enumerable',   new Descriptor({ value: desc._enumerable, configurable: true, enumerable: true, writable: true, }));
  if(desc._value)        o._defineOwnProperty('value',        new Descriptor({ value: desc._value, configurable: true, enumerable: true, writable: true, }));
  if(desc.writable)      o._defineOwnProperty('writable',     new Descriptor({ value: desc.writable, configurable: true, enumerable: true, writable: true, }));
  if(desc._set)          o._defineOwnProperty('set',          new Descriptor({ value: desc._set, configurable: true, enumerable: true, writable: true, }));
  if(desc._get)          o._defineOwnProperty('get',          new Descriptor({ value: desc._get, configurable: true, enumerable: true, writable: true, }));

  return o;
}

function toDescriptor(o){
  let desc = new Descriptor();

  if(o._hasProperty('configurable')) desc._configurable = o._get('configurable');
  if(o._hasProperty('enumerable')) desc._enumerable = o._get('enumerable');
}

function Obj(v){
  // if(Object.prototype.isPrototypeOf(this)) return ;

  if(v == null) return { _prototype: Object.prototype, _extensible: true, }; 

  return toObject(v);
}

Obj.defineProperty = function(o, k, desc){
  if(typeof o !== 'object' && o !== null) throw new TypeError('');

  k = toPropertyKey(k);
  desc = toPropertyDescriptor(desc);
  
  let res = o._defineOwnProperty(k, desc);
  if(!res) throw new TypeError('');
  return res;
}

Obj.defineProperties = function(o, descObj){
  if(typeof o !== 'object' && o !== null) throw new TypeError('');
  descObj = toObject(descObj);

  let keys = descObj._ownPropertyKeys(),
      descriptorList = [];

  keys.forEach(v => {
    let currentDesc = o._getOwnProperty(v);
    if(currentDesc !== undefined && currentDesc.enumerable) descriptorList.push([v, toPropertyDescriptor(descObj._get(v))]);
  });

  descriptorList.forEach(v => { o._defineOwnProperty(v[0], v[1]); });
  return o;
}

Obj.create = function(o, descObj){
  if(typeof o !== object) throw new TypeError('');

  let obj = { _prototype: o, _extensible: true, };

  if(descObj !== undefined) return Obj.defineProperties(obj, descObj);
  return obj;
}

Obj.getOwnPropertyDescriptor = function(o, k){
  [o, k] = [toObject(o), toPropertyKey(k)];

  return fromDescriptor(o._getOwnProperty(k));
}

Obj.getOwnPropertyDescriptors = function(o){
  o = toObject(o);

  let keys = o._ownPropertyKeys(),
      descs = { _prototype: Object.prototype, };

  keys.forEach(v => {
    let descObj = fromDescriptor(o._getOwnProperty(v));
    if(descObj !== undefined) desc._defineOwnProperty(v, new Descriptor({ value: descObj, configurable: true, enumerable: true, writable: true, }));
  });

  return descs;
}

// Property Key
Obj.getOwnPropertyNames = function(o){
  o = toObject(o);

  let keys = o._ownPropertyKeys(),
      names = [];
  
  keys.forEach(k => typeof k == 'string' ? names.push(k) : 0);
  return names;
}

Obj.getOwnPropertySymbols = function(o){
  o = toObject(o);

  let keys = o._ownPropertyKeys(),
      names = [];
  
  keys.forEach(k => typeof k == 'string' ? names.push(k) : 0);
  return names;
}

Obj.keys = function(o){
  o = toObject(o);
  
  let keys = o._ownPropertyKeys(), props = [];

  keys.filter(v => typeof v === 'string').forEach(v => {
    let desc = o._getOwnProperty(v);

    if(desc !== undefined && desc.enumerable) props.push(v);
  });

  return props;
}

Obj.values = function(o){
  o = toObject(o);

  let keys = o._ownPropertyKeys(), props = [];
  
  keys.filter(v => typeof v === 'string').forEach(v => {
    let desc = o._getOwnProperty(v);

    if(desc !== undefined && desc.enumerable) props.push(o._get(v, o));
  });

  return props;
}

Obj.entries = function(){
  o = toObject(o);

  let keys = o._ownPropertyKeys(), props = [];
  
  keys.filter(v => typeof v == 'string').forEach(v => {
    let desc = o._getOwnProperty();

    if(desc !== undefined && desc.enumerable) props.push([v, o._get(v)]);
  });
}

Obj.is = function(v1, v2){ return sameValue(v1, v2); }

Obj.getPrototypeOf = function(o){
  o = toObject(o);

  return o._getPrototypeOf();
}

Obj.setPrototypeOf = function(o, proto){
  if(o == null || typeof proto !== object) throw new TypeError(''); 

  if(typeof o !== object) return o;

  if(!o._setPrototypeOf(proto)) throw new TypeError('');
  return o;
}

// 
Obj.isExtensible = function(o){
  if(typeof o !== 'object' || o === null) return false;
  
  return o._isExtensible(); 
}

Obj.preventExtensions = function(o){
  if(typeof o !== 'object' || o === null) return o;

  if(!o._preventExtensions()) return false;
  return o;
}

Obj.isSealed = function(o){
  if(typeof o !== 'object' || o === null) return true;
  if(o._isExtensible()) return false;

  let keys = o._ownPropertyKeys();
  for(let i = keys.length -1; i >= 0; i--){
    let desc = o._getOwnProperty(keys[i]); 

    if(desc !== undefined && desc.configurable) return false;
  }

  return true;
}

Obj.seal = function(o){
  if(typeof o !== 'object' || o !== null) return o;

  if(!o._preventExtensions()) throw new TypeError('');

  let keys = o._ownPropertyKeys();
  keys.forEach(v => { o._defineOwnProperty(v, new Descriptor({ configurable: false, })); });

  return o;
}

Object.isFrozen = function(o){
  if(typeof o !== 'object' || o === null) return true;
  if(o._isExtensible()) return false;

  let keys = o._ownPropertyKeys();
  for(let i = keys.length -1; i >= 0; i--){
    let desc = o._getOwnProperty(keys[i]); 

    if(desc !== undefined && desc.configurable)  return false;
    if(isDataDescription(desc) && desc.writable) return false;
  }
}

Obj.freeze = function(o){
  if(typeof o !== 'object' || o !== null) return o;

  if(!o._preventExtensions()) throw new TypeError('');

  let keys = o._ownPropertyKeys();
  keys.forEach(v => { o._defineOwnProperty(v, new Descriptor(isAccessorDescription ? { configurable: false, } : { configurable: false, writable: true, })); });

  return o;
}

Obj.assign = function(o, ...sourses){
  o = toObject(o); 
  if(!sourses.length) return o;

  sourses.forEach(v => {
    if(v != null){
      v = toObject(v);
      
      let keys = v._ownPropertyKeys();
      keys.forEach(k => {
        let desc = v._getOwnProperty(k);

        if(desc !== undefined && desc.enumerable) o._set(k, v._get(k), o);
      });
    }
  });

  return o;
}

Obj.prototype = Object.create(null, {
  
});

// genertic
Obj.prototype.isPrototypeOf = function(o){
  if(typeof o !== 'object' || o === null) throw new TypeError('');

  let proto = toObject(this);

  while(true){
    let parent = o._getPrototypeOf();
    if(!parent) return false;
    if(parent && sameValue(proto, o)) return true;
  }
}

Obj.prototype.hasOwnProperty = function(k){
  k = toPropertyKey(k);

  let o = toObject(this),
      desc = o._getOwnProperty(k);

  return desc ? true : false;
}

Obj.prototype.propertyIsEnumerable = function(k){
  k = toPropertyKey(k);

  let o = toObject(this),
      desc = o._getOwnProperty(k);

  return desc && desc.enumerable ? true : false;
}

Obj.prototype.valueOf = function(){ return toObject(this); }
function t(){
  if(this === undefined) return '[object Undefined]';
  if(this === null) return '[object Null]';

  let o = toObject(this),
      tag = '';

  if(o._errorData)          tag = 'Error';
  else if(o._booleanData)   tag = 'Boolean';
  else if(o._NumberData)    tag = 'Number';
  else if(o._dateData)      tag = 'Date';
  else if(o._stringData)    tag = 'String';
  else if(o._regexp)        tag = 'RegExp';
  else if(Array.isArray(o)) tag = 'Array';
  else                      tag = 'Object';

  let t = o._get(Symbol.toStringTag);
  return `[object ${typeof t === 'string' ? t : tag}]`;
}

module.exports = {
  Obj,
}