const D = require('../../../standard/date');

describe('Date', () => {

  describe('Date constructor', () => {
    test('functon call, no argument', () => { expect(typeof Date()).toBe('string'); });

    test('new call, no argument',     () => { expect(typeof new Date()).toBe('object'); });

    test('new call, one argument',    () => { expect(new Date(0).getTime()).toBe(0); });
    test('new call, one argument',    () => { expect(new Date('1970-01-01T00:00:00z').getTime()).toBe(0); });
    test('new call, one argument',    () => { expect(new Date('1970-01-01T08:00:00').getTime()).toBe(0); });
    test('new call, one argument',    () => { expect(new Date('1970-01-01').getTime()).toBe(0); });

    test('new call, two+ argument',   () => { expect(new Date(1970, 0, 1, 8).getTime()).toBe(0); });
  });

  describe('Date prototype', () => {
    test('valueOf', () => { expect(Date.prototype.valueOf.bind({})).toThrow('this is not a Date object.'); });

    // test('toJSON', () => { expect(typeof new Date.toJSON).toBe(); });
  });

});