
describe('Object', () => {

  describe('Object construct', () => {

    describe('propertyDescriptor', () => {
      describe('Object.definedProperty', () => {
        let o = {},
            define = Object.defineProperty,
            setNocallableDesc = { set: null, },
            generticDesc = { value: 1, set(){}, };

        test('first argument is no object', () => { expect(() => { Object.defineProperty(1, 1, 1); }).toThrow('Object.defineProperty called on non-object'); }); 
        test('third argument is no object', () => { expect(() => { Object.defineProperty(o, 1, 1); }).toThrow(`Property description must be an object: ${1}`); }); 
        test('desc is no object',           () => { expect(() => { Object.defineProperty(o, 1, null); }).toThrow(``); }); 
        test('desc.set is no callable',     () => { expect(() => { Object.defineProperty(o, 1, setNocallableDesc); }).toThrow(`Setter must be a function: ${null}`); }); 
        test('desc has value and set',      () => { expect(() => { Object.defineProperty(o, 1, generticDesc); }).toThrow(`Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>`); });

        test('no currentDesc',                                                                () => { expect(postName()).toBe(1); });
        test('currentDesc.configurable is false',                                             () => { expect(() => { define(o, 'name', { configurable: true, }); }).toThrow(); });
        test('both dataDescriptor, currentDesc.configurable|writable is false',               () => { expect(() => { define(o, 'name', { writable: true, }); }).toThrow(); });
        test('both accessorDescriptor, currentDesc.configurable is false',                    () => { expect(() => { putGetName(); }).toThrow(); });
        test('one dataDescriptor, one accessorDescriptor, currentDesc.configurable is false', () => { expect(() => { define(o, 'name', { get: () => 123, }); }).toThrow(''); });

        function postName(){
          Object.defineProperty(o, 'name', { value: 1, });

          return o.name;
        }

        function putGetName(){
          Object.defineProperty(o, 'getName', { get: () => o.name, });

          Object.defineProperty(o, 'getName', { set: () => 12 });
        }
      });

      describe('Object.defineProperties', () => {
        let o = {},
            define = Object.defineProperties,
            setNocallableDesc = { set: null, },
            generticDesc = { value: 1, set(){}, };

        test('first argument is no object',  () => { expect(() => define(null, {})).toThrow('Object.defineProperties called on non-object'); });
        test('descObj is no convert object', () => { expect(() => define(o, null)).toThrow(''); });
        test('desc is no object',            () => { expect(() => { Object.defineProperty(o, 1, null); }).toThrow(``); }); 
        test('desc.set is no callable',      () => { expect(() => { Object.defineProperty(o, 1, setNocallableDesc); }).toThrow(`Setter must be a function: ${null}`); }); 
        test('desc has value and set',       () => { expect(() => { Object.defineProperty(o, 1, generticDesc); }).toThrow(`Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>`); });
      });

      describe('Object.create', () => {
        let create = Object.create;

        test('first argument is neither Object nor null', () => { expect(() => create(undefined)).toThrow(''); });
      });

      describe('Object.getOwnPropertyDescriptor', () => {
        let get = Object.getOwnPropertyDescriptor,
            o = { type: 1, };

        test('first argument convert fail',  () => { expect(() => get(undefined, 1)).toThrow(''); }); 
        test('second argument convert fail', () => { expect(() => get(o, { [Symbol.toPrimitive](){ return {}; } })).toThrow(''); }); 

        test('object no propertyKey',        () => { expect(get(o, 'name')).toBe(undefined); });
        test('object has dataProperty',      () => { expect(get(o, 'type')).toEqual({ configurable: true, enumerable: true, writable: true, value: 1, }); });
      });

      describe('Object.getOwnPropertyDescriptors', () => {
        let get = Object.getOwnPropertyDescriptors,
            o = { name: 123, getName(){ return this.name }, },
            descs = { name: { configurable: true, enumerable: true, writable: true, value: 123, }, getName: { configurable: true, enumerable: true, writable: true, value: o.getName, } };

        test('first argument convert fail', () => { expect(() => get(undefined, 1)).toThrow(''); }); 

        test('get object all descriptor',   () => { expect(get(o)).toEqual(descs); });
      });
    });

    describe('property Key', () => {
      describe('Object.getOwnPropertyNames', () => {
        let get = Object.getOwnPropertyNames,
            o = { name: 'o', };

        test('first argument convert fail', () => { expect(() => { get(undefined) }).toThrow(''); });
        test('get object string key',       () => { expect(get(o)).toEqual(['name']) });
      }); 

      describe('Object.getOwnPropertySymbols', () => {
        let get = Object.getOwnPropertySymbols,
            o = { [Symbol.toStringTag]: 'obj', };

        test('first argument convert fail', () => { expect(() => { get(undefined) }).toThrow(''); });
        test('get object Symbol key',       () => { expect(get(o)).toEqual([Symbol.toStringTag]) });
      });

      describe('Object.keys', () => {
        let keys = Object.keys;

        test('param convert fail', () => { expect(() => keys()).toThrow(''); });
        test('get keys',           () => { expect(keys({ name: 'o', })).toEqual(['name']); });
      });
    });

    describe('property Value', () => {
      let [vs, es] = [Object.values, Object.entries],
          o = { name: 'o', };

      describe('Object.values', () => {
        test('param convert fail', () => { expect(() => { vs(); }).toThrow(''); });
        test('get values',         () => { expect(vs(o)).toEqual(['o']); });
      });

      describe('Object.entries', () => {
        test('param convert fail', () => { expect(() => { es(); }).toThrow(''); });
        test('get entries',        () => { expect(es(o)).toEqual([ ['name', 'o'] ]); });
      });
    });

    describe('compary', () => {
      describe('Object.is', () => {
        test('0.1, "0.1"',   () => { expect(Object.is(0.1, '0.1')).toBe(false); });
        test('NaN, NaN', () => { expect(Object.is(NaN, NaN)).toBe(true); });
        test('+0, -0',   () => { expect(Object.is(+0, -0)).toBe(false); });
      });
    });
    
    describe('prototype', () => {
      describe('Object.getPrototypeOf', () => {
        let get = Object.getPrototypeOf;

        test('first argument is undefined|null', () => { expect(() => { get(undefined); }).toThrow(''); }); 
        test('get Object.prototype',             () => { expect(get(Object.prototype)).toBe(null); });
      });

      describe('Object.setPrototypeOf', () => {
        let set = Object.setPrototypeOf;

        test('first argument is undefined|null',           () => { expect(() => { set(undefined) }).toThrow(''); });
        test('first argument is primitive value',          () => { expect(set(1, {})).toBe(1); });
        test('second argument is neither object nor null', () => { expect(() => { set({}, 1); }).toThrow(''); });
      });
    });

    // 非对象者不可
    describe('auth', () => {
      describe('extensible', () => {
        describe('Object.isExtensible', () => {
          let isExtensible = Object.isExtensible;

          test('param is no object', () => { expect(isExtensible(1)).toBe(false); });
          test('param is object',    () => { expect(isExtensible({})).toBe(true); });
        });

        describe('Object.preventExtensible', () => {
          let prevent = Object.preventExtensions;

          test('param is no object', () => { expect(prevent(1)).toBe(1); });
          test('param is object', () => { expect(preventExtensions()).toBe(false); });

          function preventExtensions(){
            let o = prevent({});

            return Object.isExtensible(o);
          }
        });
      });

      describe('seal', () => {
        let [isSealed, seal] = [Object.isSealed, Object.seal],
            o = { name: 'o', };

        test('isSealed()', () => { expect(isSealed()).toBe(true); });
        test('isSealed(extensible)', () => { expect(isSealed(o)).toBe(false); });

        test('seal(o)', () => { expect(Object.getOwnPropertyDescriptor(seal(o), 'name')).toEqual({ configurable: false, enumerable: true, writable: true, value: 'o', }); });
      });

      describe('freeze', () => {
        let [isFrozen, freeze] = [Object.isFrozen, Object.freeze],
            o = { name: 'o' }; 

        test('isFrozen()', () => { expect(isFrozen()).toBe(true); });
        test('isFrozen(extensible)', () => { expect(isFrozen(o)).toBe(false); });

        test('freeze(o)', () => { expect(Object.getOwnPropertyDescriptor(freeze(o), 'name')).toEqual({ configurable: false, enumerable: true, writable: false, value: 'o', }); });
      });
      
    });

  });

  describe('object prototype', () => {
    let o = Object.create(Object.prototype, {
      name: { value: 'o', enumerable: true, writable: true },
      _name: { value: 'oo', },
      [Symbol.toStringTag]: 'Obj',
    });

    describe('hasOwnProperty', () => {
      test('this convert fail',   () => { expect(() => { Object.prototype.hasOwnProperty.call(null); }).toThrow('-'); }); 
      test('o has name property', () => { expect(o.hasOwnProperty('name')).toBe(true); });
    });

    describe('propertyIsEnumerable', () => {
      test('this convert fail',   () => { expect(() => { Object.prototype.propertyIsEnumerable.call(null); }).toThrow('-'); }); 
      test('o has name property', () => { expect(o.propertyIsEnumerable('_name')).toBe(true); });
    });

    describe('isPrototypeOf', () => {
      test('first arguments is no object',     () => { expect(Object.prototype.isPrototypeOf(1)).toThrow('-'); }); 
      test('first arguments is object(legal)', () => { expect(Object.prototype.isPrototypeOf(o)).toBe(true); });
    });

    describe('toString', () => {
      test('this convert fail',           () => { expect(Object.prototype.toString.call(null)).toBe('[object Null]'); });
      test('this is buildIn object',      () => { expect(Object.prototype.toString.call(new Error())).toBe('[object Error]'); });
      test('this is Symbol',              () => { expect(Object.prototype.toString.call(Symbol.toStringTag)).toBe('[object Symbol]'); });
      test('this has Symbol.toStringTag', () => { expect(o.toString()).toBe('[object Obj]'); });
    });
  });

});