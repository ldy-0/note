const Numeric = require('../../../standard/numeric');

describe('Numeric Test', () => {

  test('Numeric.NaN Test', () => {
    expect(Numeric.NaN).toBe(NaN);
  });

  test('Numeric.prototype.valueOf Test', () => {
    expect(new Numeric(2).valueOf()).toBe(2);
  });

  test('Numeric.prototype.valueOf.call Test', () => {
    expect(Numeric.prototype.valueOf.bind('a')).toThrow('invalidate Number');
  });

  test('', () => {
    // console.error((1.2).toString());           1.2
    // console.error((1.2).toString(null));       RangeError
    // console.error((21.2).toString(-10));       RangeError(no standard|21.2)
    // console.error((21.2).toString(Infinity));  RangeError
    // console.error(Infinity.toString(2));       Infinity(no standard|RangeError)

    // console.error((1.2).toFixed());
    // console.error((1.2).toFixed(null));
  });

});