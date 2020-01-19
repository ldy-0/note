expect.extend({
  toTrue(received, argument){
    return { message: () => received ? '' : `received: ${received}\nexpect: true`, pass: received === true ? true : false, };
  },

  toFalse(received, argument){
    return { message: () => received === true ? '' : `received: ${received}\nexpect: false`, pass: received === false ? true : false, };
  },
});

describe('Boolean', () => {

  describe('Boolean constructor', () => {
    test('Boolean as function call', () => { expect(Boolean()).toFalse(); });
    test('Boolean as function call', () => { expect(Boolean(1)).toTrue(); });
    
    test('Boolean as constructor call', () => { expect(new Boolean().toString()).toBe('false'); });
    test('Boolean as constructor call', () => { expect(new Boolean(1).toString()).toBe('true'); });
  }); 

  describe('Boolean prototype', () => {
    test('Boolean.prototype is Boolean Object', () => { expect(Boolean.prototype.valueOf()).toFalse(); });

    test('Boolean.prototype.valueOf no genertic', () => { expect(Boolean.prototype.valueOf.bind(null)).toThrow('Boolean.prototype.valueOf requires that \'this\' be a Boolean'); });

    test('Boolean.prototype.toString', () => { expect(Boolean.prototype.toString()).toBe('false'); });
  });
});


describe('Symbol', () => {
  describe('Symbol constructor', () => {
    test('Symbol no as constructor', () => { expect(() => new Symbol()).toThrow('Symbol is not a constructor'); });

    test('Symbol as function call',  () => { expect(typeof Symbol()).toBe('symbol'); });

    test('Symbol.for ',              () => { expect(Symbol.for('1')).toBe(Symbol.for('1')); });
    test('Symbol.keyFor ',           () => { expect(Symbol.keyFor(Symbol.for('1'))).toBe('1'); });
  }); 

  describe('Symbol prototype', () => {
    let s = Symbol('1');

    test('Symbol.prototype[Symbol.toStringTag] is Symbol', () => { expect(Symbol.prototype[Symbol.toStringTag]).toBe('Symbol'); });
    // test('SYmbol.prototype.description',                   () => { expect(s.description).toBe('1'); });

    test('Symbol.prototype.valueOf no genertic',           () => { expect(Symbol.prototype.valueOf).toThrow('Symbol.prototype.valueOf requires that \'this\' be a Symbol'); });
    test('Symbol.prototype.toString no genertic',          () => { expect(s.toString()).toBe('Symbol(1)'); });
  });
});

describe('Error', () => {
  describe('Error constructor', () => {
    test('Error constructor as constructor, undefined', () => { expect(new Error(undefined).message).toBe(''); });
    test('Error constructor as constructor, null',      () => { expect(new Error(null).message).toBe('null'); });
    test('Error constructor as constructor, string',    () => { expect(new Error('test').message).toBe('test'); });
  }); 

  describe('Error prototype', () => {
    test('Error.prototype.name',     () => { expect(Error.prototype.name).toBe('Error'); });
    test('Error.prototype.message',  () => { expect(Error.prototype.message).toBe(''); });

    test('Error.prototype.toString', () => { expect(new Error('1').toString()).toBe('Error:\u00201'); });
  });
});