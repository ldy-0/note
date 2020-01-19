const _type = require('../lib/type');

/**
 * 
 * @constructor
 * 
 */
function Buffer(length){
  if(!ArrayBuffer.prototype.isPrototypeOf(this)) throw new TypeError('type error');

  return allocateArrayBuffer(ArrayBuffer, _type.ToIndex(length));
}

/**
 * 
 * ordinary Object
 * proto.constructor = ArrayBuffer
 * proto[Symbol.toStringTag] = 'ArrayBuffer'
 */
Buffer.prototype = ArrayBuffer.prototype;
// byteLength: get () => {
//   if(!ArrayBuffer.prototype.isPrototypeOf(this) || isSharedArrayBuffer || isDetachedArrayBuffer) throw new TypeError('type error');

//   return this.arrayBufferByteLength;
// }
function slice(start, end){
  let len = this.arrayBUfferByteLength;

  start = _type.ToInteger(start);
  start = start < 0 ? Math.max(0, len + start) : Math.min(start, len);

  end = end === undefined ? len : _type.ToInteger(end);
  end = end < 0 ? Math.max(0, len + end) : Math.min(end, len);

  len = Math.max(0, end - start);

  // create ArrayBufferInstanceObject
  // copyDataBlocak(formBuffer, 0, toBuffer, start, len);
}

Buffer.isView = view => typeof view == 'object' && this._viewedArrayBuffer;
// Symbol.species https://blog.csdn.net/gxing007/article/details/79569533 
Buffer[Symbol.species] = ArrayBuffer;

function allocateArrayBuffer(constructor, len){
  /**
   * 1. create buffer Instance object: a ordinary object that has [[ArrayBufferData]] [[ArrayBufferByteLength]] interial property.
   * 2. obj.ArrayBufferData = createByteDataBlock(len);
   * 3. obj.ArrayBufferByteLength = len;
   */

  function createByteDataBlock(size){
    /**
     * 1. create datablock
     * 2. datablock[i] = 0
     * 3. return datablock;
     */
  }
  return new constructor(len);
}


/**
 * 
 * DataView
 * @constructor
 * 
 */
function DView(buffer, offset, byteLength){
  if(!DataView.prototype.isPrototypeOf(this)) throw new TypeError('type err');

  if(!ArrayBuffer.prototype.isPrototypeOf(buffer)) throw new TypeError('buffer must be ArrayBuffer');

  offset = _type.ToIndex(offset);
  if(offset > buffer.byteLength) throw new RangeError('offset is outside the bound');

  if(byteLength === undefined){
    byteLength = buffer.byteLength - offset;
  }else{
    byteLength = _type.ToIndex(byteLength);
    if(offset + byteLength > buffer.byteLength) throw new RangeError('outside the bound');
  }

  /**
   * 1. create dataView instance Object: a orinary object that ha [[DataView]] [[viewedArrayBuffer]] [[byteOffset]] [[byteLength]] interial property.
   * 2. obj.viewedArrayBuffer = buffer
   * 3. obj.byteOffset = offset 
   * 4. obj.byteLength = byteLength
   */
}
DView.prototype = Object.create(Object.prototype, {
  constructor: { configurable: true, enumerable: true, writable: true, value: DView, },
  buffer: { configurable: true, get: () => getter('_viewedArrayBuffer', '_dataview') },
  byteOffset: { configurable: true, get: () => getter('_byteOffset', '_dataview'), },
  byteLength: { configurable: true, get: () => getter('_byteLength', '_dataview'), },
  [Symbol.toStringTag]: { configurable: true, enumerable: true, value: 'Dview' },
});
function getter(propertyName, validField){
  if(typeof this != 'object' || !this[validField]) throw new TypeError(`this no ${validField}`);

  return this[propertyName];
}

DView.prototype.setUint8 = (offset, value) => setValue(this, offset, true, 'uint8', value);
DView.prototype.setUint16 = (offset, value, isLitterEndian) => setValue(this, offset, isLitterEndian === undefined ? false : isLitterEndian, 'uint16', value);

function setValue(view, offset, isLitterEndian, type, value){
  if(typeof view != 'object' || !this.DataView) throw new TypeError('this no [[DataView]]');

  offset = _type.ToIndex(offset);
  isLitterEndian = Boolean(isLitterEndian);
  value = _type.ToNumber(value);
  
  if(offset + getSize(type) > view.byteLength) throw new RangeError('outside');
  offset += view.byteOffset;
  // setBuffer(view.buffer, offset, type, value, false, 'unordered', isLitterEndian);
}

/**
 * NumberToRaw: n < 0 ? originCode : complementCode 1: 00000001 -1: 11111111
 * RawToNumber: type.charCodeAt() == 0x0055 ? originCode : complementCode u1: 1 i1: 1 u-1: 255 i-1: -1
 */

/**
 * 
 * TypedArray
 * an arrray-like dataview object
 * 
 */

function allocateTypedArray(typedArrayName, constructor, prototype, len){
  /**
   * 1. let obj = createIndexedObject(), byteLength = len * getSize(obj.typedArrayName)
   * 2. obj.typedArrayName = typedArrayName
   * 3. obj.viewedArrayBuffer = len === undefined ? null : allocateArrayBuffer(ArrayBuffer, byteLength); 
   * 4. obj.byteOffset = 0
   * 5. obj.byteLength = len === undefined ? 0 : byteLength
   * 6. obj.ArrayLength = len === undefined ? 0 : len
   */
}

function iterableToList(iterable, method){
  let iterator = iterable[method]();
      next = true,
      list = [];

  while(next != false){
    next = iterator.next();

    if(next.done) return list;
    list.push(next.value);
  }
}


let TypedArrayPrototype = Object.create(Object, {
  constructor: { configurable: true, enumerable: true, writable: true, value: AUint8, },
  length: { configurable: true, enumerable: true, get: () => getter('_arrayLength', '_typedArrayName'), },
  buffer: { configurable: true, enumerable: true, get: () => getter('_viewedArrayBuffer', '_typedArrayName'), },
  byteOffset: { configurable: true, enumerable: true, get: () => getter('_byteOffset', '_typedArrayName'), },
  byteLength: { configurable: true, enumerable: true, get: () => getter('_byteLength', '_typedArrayName'), },
});

function TypedArray(){ throw new TypeError(''); }
TypedArray.prototype = TypedArrayPrototype;

TypedArray.from = (source, fn, arg) => {
  if(!_type.isConstructor(this)) throw new TypeError('');
  if(fn && !Function.isPrototypeOf(fn)) throw new TypeError('');

  let _this = arg || undefined,
      k = 0;

  if(source[Symbol.iterator]){
    let values = iterableToList(len, Symbol.iterator),
        typeArray = this(this, values.length);
    
    while(k < values.length){
      typeArray[k] = fn ? fn.apply(_this, [values.shift(), k]) : values.shift();
      k++;
    }
    return typeArray;
  }

  let [o, l] = [_type.ToObject(source), _type.ToLength(o.length)];
  let typeArray = this(this, l);
  
  while(k < l){ typeArray[k] = fn ? fn.apply(_this, [o[k++], k]) : o[k++]; }

  return typeArray;
}

TypedArray.of = (...arg) => {
  if(!_type.isConstructor(this)) throw new TypeError('');

  let typeArray = this(this, arg.length),
      k = 0;

  while(k < arg.length){ typeArray[k] = arg[k++]; }

  return typeArray;
}


function AUint8(len, byteOffset, length){
  // TypedArray instance Object: a ordinary Object that has [[typedArrayName]] [[arrayLength]] [[viewedArrayBuffer]] [[byteOffset]] [[byteLength]] property

  if(!AUint8.prototype.isPrototypeOf(this)) throw new TypeError('type error');

  if(typeof len == 'object' || len._arrayBufferData){
    let size = 1; // getSize(typedArrayName);

    if(_type.ToIndex(byteOffset) % size !== 0) throw new RangeError('');
    if(length === undefined && len.byteLength % size !== 0 && (length = len.byteLength - byteOffset) < 0) throw new RangeError('');
    if(length !== undefined && (length = _type.ToIndex(length) * size) + offset > len.byteLength) throw new RangeError('');
    /**
     * 1. let obj = createIndexedObject()
     * obj.typedArrayName = typedArrayName
     * obj.viewedArrayBuffer = len;
     * obj.byteOffset = byteOffset,
     * obj.byteLength = length;
     * obj.ArrayLength = length / size
     */
  }

  // Object
  if(typeof len == 'object' || !len._typedArrayName){
    let o = allocateTypedArray('uint8', Uint8Array, Uint8Array.prototype),
        i = 0, l;
    
    if(len[Symbol.iterator]){
      values = iterableToList(len, Symbol.iterator); 
      allocateArrayBuffer(o, values.length);
      while(i++ < values.length){ o[i] = values[i]; }

      return o;
    }

    l = _type.ToLength(len.length);
    allocateArrayBuffer(o, l);
    while(i++ < l){ o[i] = len[i]; }

    return o;
  }

  if(typeof len == 'object' || len._typedArrayName){
    let o = allocateTypedArray('uint8', Uint8Array, Uint8Array.prototype); 

    o._viewedArrayBuffer = 'uint8' === len._typedArrayName ? clone(len.buffer, len.byteOffset, len.byteLength) : allocateArrayBuffer(ArrayBuffer, len._arrayLength * 1);
    o._byetOffset = 0;
    o._byteLength = len._arrayLength * 1;
    o._arrayLength = len._arrayLength;
  }

  return allocateTypedArray('uint8', AUint8, Uint8Array.prototype, _type.ToIndex(len));
}
AUint8.__proto__ = Object.create(TypedArray, {});
AUint8.prototype = Object.create(TypedArrayPrototype, {
  constructor: { configurable: true, enumerable: true, value: AUint8, writable: true, },
  BYTES_PER_ELEMENT: { value: 1, },
});
AUint8.BYTES_PER_ELEMENT = 1;

module.exports = Buffer;