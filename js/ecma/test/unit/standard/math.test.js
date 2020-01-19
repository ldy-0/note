const M = require('../../../standard/math');

describe('Math Test', () => {

  test('Math[Symbol.toStringTag]', () => { expect(Math.toString()).toBe('[object Math]'); });

  describe('Math.abs', () => {
    test('NaN', () => { expect(Math.abs(NaN)).toBe(NaN); });
    test('-Infinity', () => { expect(Math.abs(-Infinity)).toBe(Infinity); });
    test('-1', () => { expect(Math.abs(-1)).toBe(1); });
  });

  describe('rounding', () => {
    describe('Math.ceil', () => {
      test('NaN', () => { expect(Math.ceil(NaN)).toBe(NaN); });
      test('Infinity', () => { expect(Math.ceil(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.ceil(-Infinity)).toBe(-Infinity); });
      test('0', () => { expect(Math.ceil(0)).toBe(0); });
      test('-0', () => { expect(Math.ceil(-0)).toBe(-0); });

      test('-1 < x < 0 return -0', () => { expect(Math.ceil(-0.2)).toBe(-0); });
      test('0.2', () => { expect(Math.ceil(0.2)).toBe(1); });
      test('-2.2', () => { expect(Math.ceil(-2.2)).toBe(-2); });
    });

    describe('Math.floor', () => {
      test('NaN', () => { expect(Math.floor(NaN)).toBe(NaN); });
      test('Infinity', () => { expect(Math.floor(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.floor(-Infinity)).toBe(-Infinity); });
      test('0', () => { expect(Math.floor(0)).toBe(0); });
      test('-0', () => { expect(Math.floor(-0)).toBe(-0); });

      test('0 < x < 1 return +0', () => { expect(Math.floor(0.9)).toBe(0); });
      test('-0.9', () => { expect(Math.floor(-0.9)).toBe(-1); });
    });

    describe('Math.trunc', () => {
      test('NaN',       () => { expect(Math.trunc(NaN)).toBe(NaN); });
      test('Infinity',  () => { expect(Math.trunc(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.trunc(-Infinity)).toBe(-Infinity); });
      test('0',         () => { expect(Math.trunc(0)).toBe(0); });
      test('-0',        () => { expect(Math.trunc(-0)).toBe(-0); });

      test('0.6',       () => { expect(Math.trunc(0.6)).toBe(0); });
      test('-0.6',      () => { expect(Math.trunc(-0.6)).toBe(-0); });
    });

    describe('Math.round', () => {
      test('NaN',       () => { expect(Math.round(NaN)).toBe(NaN); });
      test('Infinity',  () => { expect(Math.round(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.round(-Infinity)).toBe(-Infinity); });
      test('0',         () => { expect(Math.round(0)).toBe(0); });
      test('-0',        () => { expect(Math.round(-0)).toBe(-0); });

      test('0.4',       () => { expect(Math.round(0.4)).toBe(0); });
      test('-0.4',      () => { expect(Math.round(-0.4)).toBe(-0); });
      test('0.5',       () => { expect(Math.round(0.5)).toBe(1); });
      test('-0.5',      () => { expect(Math.round(-0.5)).toBe(-0); });
      test('-0.6',      () => { expect(Math.round(-0.6)).toBe(-1); });
    });
  });

  describe('初等函数', () => {

    describe('trigon', () => {
      describe('sin', () => {
        test('NaN', () => { expect(Math.sin(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.sin(Infinity)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.sin(-Infinity)).toBe(NaN); });
        test('0', () => { expect(Math.sin(0)).toBe(0); });
        test('-0', () => { expect(Math.sin(-0)).toBe(-0); });

        test('Math.PI / 2', () => { expect(Math.sin(Math.PI / 2)).toBeCloseTo(1); });
        test('Math.PI / 6', () => { expect(Math.sin(Math.PI / 6)).toBeCloseTo(0.5); });
      });

      describe('cos', () => {
        test('NaN', () => { expect(Math.cos(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.cos(Infinity)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.cos(-Infinity)).toBe(NaN); });
        test('0', () => { expect(Math.cos(0)).toBe(1); });
        test('-0', () => { expect(Math.cos(-0)).toBe(1); });

        test('Math.PI / 2', () => { expect(Math.cos(Math.PI / 2)).toBeCloseTo(0); });
        test('Math.PI / 3', () => { expect(Math.cos(Math.PI / 3)).toBeCloseTo(0.5); });
      });

      describe('tan', () => {
        test('NaN', () => { expect(Math.tan(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.tan(Infinity)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.tan(-Infinity)).toBe(NaN); });
        test('0', () => { expect(Math.tan(0)).toBe(0); });
        test('-0', () => { expect(Math.tan(-0)).toBe(-0); });

        test('Math.PI / 2', () => { expect(Math.tan(Math.PI / 2)).toBeCloseTo(16331239353195370); });
        test('Math.PI / 4', () => { expect(Math.tan(Math.PI / 4)).toBeCloseTo(1); });
      });

      // [-1, 1]
      describe('asin', () => {
        test('NaN', () => { expect(Math.asin(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.asin(Infinity)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.asin(-Infinity)).toBe(NaN); });
        test('0', () => { expect(Math.asin(0)).toBe(0); });
        test('-0', () => { expect(Math.asin(-0)).toBe(-0); });

        test('Math.SQRT2 / 2', () => { expect(Math.asin(Math.SQRT2 / 2)).toBeCloseTo(Math.PI / 4); });
        test('0.5', () => { expect(Math.asin(0.5)).toBeCloseTo(Math.PI / 6); });
        test('1.2', () => { expect(Math.asin(1.2)).toBeNaN() });
      });

      describe('acos', () => {
        test('NaN', () => { expect(Math.acos(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.acos(Infinity)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.acos(-Infinity)).toBe(NaN); });
        test('0', () => { expect(Math.acos(0)).toBe(Math.PI / 2); });
        test('-0', () => { expect(Math.acos(-0)).toBe(Math.PI / 2); });

        test('Math.SQRT2 / 2', () => { expect(Math.acos(Math.SQRT2 / 2)).toBeCloseTo(Math.PI / 4); });
        test('0.5', () => { expect(Math.acos(0.5)).toBeCloseTo(Math.PI / 3); });
      });

      describe('atan', () => {
        test('NaN', () => { expect(Math.atan(NaN)).toBe(NaN); });
        test('Infinity', () => { expect(Math.atan(Infinity)).toBe(Math.PI / 2); });
        test('-Infinity', () => { expect(Math.atan(-Infinity)).toBe(-Math.PI / 2); });
        test('0', () => { expect(Math.atan(0)).toBe(0); });
        test('-0', () => { expect(Math.atan(-0)).toBe(-0); });

        test('Math.sqrt(3)', () => { expect(Math.atan(Math.sqrt(3))).toBeCloseTo(Math.PI / 3); });
        test('1', () => { expect(Math.atan(1)).toBeCloseTo(Math.PI / 4); });
      });
    });

    describe('exp', () => {
      test('NaN', () => { expect(Math.exp(NaN)).toBe(NaN); });
      test('Infinity', () => { expect(Math.exp(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.exp(-Infinity)).toBe(0); });
      test('0', () => { expect(Math.exp(0)).toBe(1); });
      test('-0', () => { expect(Math.exp(-0)).toBe(1); });
      test('-Infinity', () => { expect(Math.expm1(-Infinity)).toBe(-1); });
      test('0', () => { expect(Math.expm1(0)).toBe(0); });
      test('-0', () => { expect(Math.expm1(-0)).toBe(-0); });

      test('1', () => { expect(Math.exp(1)).toBe(Math.E); });
      test('1', () => { expect(Math.expm1(1)).toBe(Math.E - 1); });
    });

    describe('log', () => {
      describe('log e', () => {
        test('NaN', () => { expect(Math.log(NaN)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.log(-Infinity)).toBe(NaN); });
        test('-3', () => { expect(Math.log(-3)).toBe(NaN); });
        test('Infinity', () => { expect(Math.log(Infinity)).toBe(Infinity); });
        test('0', () => { expect(Math.log(0)).toBe(-Infinity); });
        test('-0', () => { expect(Math.log(-0)).toBe(-Infinity); });
      }); 

      describe('log1p', () => {
        test('NaN', () => { expect(Math.log1p(NaN)).toBe(NaN); });
        test('-Infinity', () => { expect(Math.log1p(-Infinity)).toBe(NaN); });
        test('-2.1', () => { expect(Math.log1p(-2.1)).toBe(NaN); });
        test('-1', () => { expect(Math.log1p(-1)).toBe(-Infinity); });
        test('Infinity', () => { expect(Math.log1p(Infinity)).toBe(Infinity); });
        test('0', () => { expect(Math.log1p(0)).toBe(0); });
        test('-0', () => { expect(Math.log1p(-0)).toBe(-0); });
      });
    });

    describe('power', () => {
      describe('pow', () => {
        test('exponent is NaN, return NaN', () => { expect(Math.pow(0, NaN)).toBe(NaN); });
        test('exponent is 0, return 1', () => { expect(Math.pow(NaN, 0)).toBe(1); });
        test('x is NaN && exponent is not 0, return NaN', () => { expect(Math.pow(NaN, Infinity)).toBeNaN(); });

        test('exponent is Infinity && Math.abs(x) > 1, return Infinity',  () => { expect(Math.pow(-Infinity,  Infinity)).toBe(Infinity); });
        test('exponent is Infinity && Math.abs(x) = 1, return NaN',       () => { expect(Math.pow(-1,         Infinity)).toBe(NaN); });
        test('exponent is Infinity && Math.abs(x) < 1, return 0',         () => { expect(Math.pow(-0.9,       Infinity)).toBe(0); });
        test('exponent is -Infinity && Math.abs(x) > 1, return 0',        () => { expect(Math.pow(-Infinity, -Infinity)).toBe(0); });
        test('exponent is -Infinity && Math.abs(x) = 1, return NaN',      () => { expect(Math.pow(-1,        -Infinity)).toBe(NaN); });
        test('exponent is -Infinity && Math.abs(x) < 1, return Infinity', () => { expect(Math.pow(-0.9,      -Infinity)).toBe(Infinity); });

        test('x is  Infinity && exponent > 0',               () => { expect(Math.pow(Infinity,  1)).toBe(Infinity); });
        test('x is  Infinity && exponent < 0',               () => { expect(Math.pow(Infinity, -1)).toBe(0); });
        test('x is -Infinity && exponent > 0 && x % 2 != 0', () => { expect(Math.pow(-Infinity, 1)).toBe(-Infinity); });
        test('x is -Infinity && exponent > 0 && x % 2 == 0', () => { expect(Math.pow(-Infinity, 2)).toBe(Infinity); });
        test('x is -Infinity && exponent < 0 && x % 2 != 0', () => { expect(Math.pow(-Infinity, -1)).toBe(-0); });
        test('x is -Infinity && exponent < 0 && x % 2 == 0', () => { expect(Math.pow(-Infinity, -2)).toBe(0); });

        test('x is  0 && exponent > 0', () => { expect(Math.pow(0, 1)).toBe(0); });
        test('x is  0 && exponent < 0', () => { expect(Math.pow(0, -1)).toBe(Infinity); });
        test('x is -0 && exponent > 0 && x % 2 !== 0', () => { expect(Math.pow(-0, 1)).toBe(-0); });
        test('x is -0 && exponent > 0 && x % 2 === 0', () => { expect(Math.pow(-0, 2)).toBe(0); });
        test('x is -0 && exponent < 0 && x % 2 !== 0', () => { expect(Math.pow(-0, -1)).toBe(-Infinity); });
        test('x is -0 && exponent < 0 && x % 2 === 0', () => { expect(Math.pow(-0, -2)).toBe(Infinity); });

        test('x < 0 && isFinite(x) && isFinite(exponent) && !isInteger(exponent)', () => { expect(Math.pow(-1, -1.2)).toBeNaN(); });
        test('x < 0 && isFinite(x) && isFinite(exponent) && !isInteger(exponent)', () => { expect(Math.pow(-1, 1.2)).toBeNaN(); });

      });

      describe('cbrt', () => {
        test('NaN', () => { expect(Math.cbrt(NaN)).toBe(NaN); });
        test('0', () => { expect(Math.cbrt(0)).toBe(0); });
        test('-0', () => { expect(Math.cbrt(-0)).toBe(-0); });
        test('Infinity', () => { expect(Math.cbrt(Infinity)).toBe(Infinity); });
        test('-Infinity', () => { expect(Math.cbrt(-Infinity)).toBe(-Infinity); });

        test('-27', () => { expect(Math.cbrt(-27)).toBe(-3); });
      });

      describe('sqrt', () => {
        test('NaN',       () => { expect(Math.sqrt(NaN)).toBe(NaN); });
        test('Infinity',  () => { expect(Math.sqrt(Infinity)).toBe(Infinity); });
        test('-Infinity', () => { expect(Math.sqrt(-Infinity)).toBe(NaN); });
        test('-0',        () => { expect(Math.sqrt(-0)).toBe(-0); });
        test('-4',        () => { expect(Math.sqrt(-4)).toBe(NaN); });
      });
    });

    describe('hype', () => {
      describe('sinh', () => {
        // test('NaN', () => { expect(Math.sinh(NaN)).toBe(NaN); });
        // test('Infinity', () => { expect(Math.sinh(Infinity)).toBe(NaN); });
        // test('-Infinity', () => { expect(Math.sinh(-Infinity)).toBe(NaN); });
        // test('0', () => { expect(Math.sinh(0)).toBe(0); });
        // test('-0', () => { expect(Math.sinh(-0)).toBe(-0); });
      });
    });

  });

  describe('32', () => {
    describe('fround', () => {
      test('NaN',       () => { expect(Math.fround(NaN)).toBe(NaN); });
      test(' 0',        () => { expect(Math.fround(0)).toBe(0); });
      test('-0',        () => { expect(Math.fround(-0)).toBe(-0); });
      test(' Infinity', () => { expect(Math.fround(Infinity)).toBe(Infinity); });
      test('-Infinity', () => { expect(Math.fround(-Infinity)).toBe(-Infinity); });
      test('0.2', () => { expect(Math.fround(0.2)).not.toBe(0.2); })
    });

    describe('Math.clz32', () => {
      test('1: 31', () => { expect(Math.clz32(1)).toBe(31); });
      test('2 ** 32 - 1: 0', () => { expect(Math.clz32(2 ** 32 - 1)).toBe(0); });
    });

    describe('imul', () => {
      test('', () => { expect(Math.imul(1, 2)).toBe(2); });
    });
  });

  describe('statistics', () => {
    let arr = [11, 20, 30, 304, "20"],
        a = [], i = 0;

    while(i++ < 130000) a.push(i);

    describe('max', () => {
      test('no arguments: -Infinity', () => { expect(Math.max()).toBe(-Infinity); });
      test('has NaN: NaN',            () => { expect(Math.max(1, 2, 'star')).toBeNaN(); });
      test(`arugments: ${arr}`,       () => { expect(Math.max.apply(null, arr)).toBe(304); });
      // test(`arguemnts.length > 120000`, () => { expect(Math.max.apply(null, a)).toThrow('Maximum call stack size exceeded'); })
    });

    describe('min', () => {
      test('no arguments: Infinity',  () => { expect(Math.min()).toBe(Infinity); });
      test('has NaN: NaN',            () => { expect(Math.min(1, 2, 'star')).toBeNaN(); });
      test(`arugments: ${arr}`,       () => { expect(Math.min.apply(null, arr)).toBe(11); });
    });

    describe('hypot', () => {
      test('no arguments: 0',             () => { expect(Math.hypot()).toBe(0); });
      test('has Infinity: Infinity',      () => { expect(Math.hypot(1, Infinity)).toBe(Infinity); });
      test('has -Infinity: Infinity',     () => { expect(Math.hypot(1, -Infinity)).toBe(Infinity); });
      test('has NaN(no +-Infinity): NaN', () => { expect(Math.hypot(1, NaN)).toBeNaN(); });
      test('3,4',                         () => { expect(Math.hypot(3, 4)).toBe(5); });
    }); 

  });

  

});