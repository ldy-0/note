const Type = require('../lib/type');

/**
 * 
 * 原码 反码 补码 移码 https://blog.csdn.net/qq_33991989/article/details/71512768
 * 负数补码等于(256 - Math.abs(数))
 * 
 * 定点数和浮点数      https://juejin.im/post/5d6e74c35188254628237d5d
 * IEEE754浮点数      http://c.biancheng.net/view/314.html
 * 浮点数             https://blog.csdn.net/z69183787/article/details/81625484
 * 00000000 00000000 00000000
 * se        f
 * 01111111 10000000 00000000 Infinity
 * 11111111 10000000 00000000 -Infinity
 * (01111111 10000000 00000000, 01111111 11111111 11111111] NaN
 * 00000000 00000000 00000000 +0 
 * 10000000 00000000 00000000 -0 
 * 非规格化数 e全为0，f不全为0
 * 规格化数 e不全为1，f不全为0
 * 
 * 阶码E: 数的移码 - 1 (使用移码是为了将有符号转为无符号，减一是为了表示Infinity,NaN)
 * e     binary    补码           阶码
 * 127   01111111  01111111(127)  11111110(254)
 * 0     00000000  00000000(0)    01111111(127)
 * -1    10000001  11111111(255)  01111110(126)
 * -126  11111110  10000010(-2)   00000001(1)
 * -127  11111111  10000001(128)  00000000(0)
 * -0    10000000 100000000(-128) 01111111(127)
 * 
 * 
 * 浮点数指数位计算(移码方式) https://blog.csdn.net/K346K346/article/details/50487127
 * 浮点数转换机器码 https://blog.csdn.net/abcdu1/article/details/75095781
 * 浮点数误差来源: https://www.iteye.com/blog/thihy-1867577
 * 
 * float 取值范围 https://www.jianshu.com/p/43b1b09f27f4
 *               https://www.cnblogs.com/HDK2016/p/10506083.html
 * float Bin->Dec https://blog.csdn.net/weixin_42562514/article/details/85264421
 * 转换工具 https://www.h-schmidt.net/FloatConverter/IEEE754.html
 * 
 * ~operate https://blog.csdn.net/qq_31070475/article/details/72598500
 * 
 * Number|Number.prototype.constructor is %number%(c++)
 * Number constructor|method : 1. create and initialize NumberObject 2. type convert
 * Number instance Object: an ordinary object that has [[NumberData]]
 * 
 */
function Numeric(n){
  n = arguments.length ? Type.ToNumber(n) : +0;

  if(!(this instanceof Numeric)) return n;

  // createFromConstructor(this, '', 'numberData'); 1. create ordinary object, 2. object._prototype = Number.prototype, 3. object._numberData = n;
  return new Number(n);
}

Object.defineProperties(Numeric, {
  // accuracy准确度 precision精确度 https://www.sohu.com/a/198461816_425658
  EPSILON: { value: 2E-52 }, // 误差范围

  // 00000000 00001111 11111111 2 2e127
  MAX_SAFE_INTEGER: { value: 2E53-1, },
  MAX_VALUE: { value: 1.7976931348623157*10E308 },
  MIN_SAFE_INTEGER: { value: -2E53+1 },
  MIN_VALUE: { value: 5*10E-324},
  POSITIVE_INFINITY: { value: Infinity },
  NEGATIVE_INFINITY: { value: -Infinity},
  NaN: { value: NaN },
  // Number Object: ordinary object with _numberData internal attribute
  prototype: { value: { _numberData: +0, _prototype: Object.prototype, } },
});

Numeric.parseFloat = parseFloat;
Numeric.parseInt = parseInt;

Numeric.isNaN = v => typeof v === 'number' && v !== v ? true :false;
Numeric.isFinite = v => typeof v != 'number' || v !== v || v == Infinity || v == -Infinity ? false : true;
Numeric.isInteger = v => Numeric.isfinite(v) && Type.ToInteger(v) == v;
Numeric.isSafeInteger = v => Numeric.isInteger(v) && Math.abs(v) < 2E53-1

/**
 * 
 * valueOf, toString, toFixed, toExponential, toPrecision is not generic function(泛型|通用)
 * 
 */

Numeric.prototype.valueOf = () => {
  // this可能是primary value, 不能使用Number.prototype.isPrototypeOf(this)判断
  if(typeof this == 'number') return this;

  if(typeof this == 'object' && this.hasOwnProperty('_numberData') && typeof this._numberData == 'number') return this._numberData;

  throw new TypeError('invalidate Number');
};

Numeric.prototype.toString = radix => {
  let v = this.valueOf();

  if(radix === undefined) radix = 10;
  radix = Type.ToInteger(radix);
  if(radix < 2 || radix > 36) throw new RangeError('2-36');
  
  return Number.prototype.toString.call(v, radix);
}

Numeric.prototype.toFixed = radix => {
  let v = this.valueOf(), s = '';

  if(radix === undefined) radix = +0;
  radix = Type.ToInteger(radix);
  if(radix < 0 || radix > 100) throw new RangeError('0-100');

  if(v !== v) return 'NaN';
  if(v < 0){ s = '-'; v = -v; }

  return v < 10 ** 21 ? this.valueOf().toFixed(radix) : this.valueOf().toFixed(radix);
};

Numeric.prototype.toExponential = radix => {
  let v = this.valueOf(), s = '';

  if(radix === undefined) radix = +0;
  radix = Type.ToInteger(radix);

  if(v !== v) return 'NaN';
  if(v < 0){ s = '-'; v = -v; }
  if(v === Infinity) return s += 'Infinity';

  if(radix < 0 || radix > 100) throw new RangeError('0-100');

  return this.valueOf().toExponential(radix);
}

Numeric.prototype.toPrecision = radix => {
  let v = this.valueOf(), s = '';

  if(radix === undefined) Type.ToString(v);
  radix = Type.ToInteger(radix);

  if(v !== v) return 'NaN';
  if(v < 0){ s = '-'; v = -v; }
  if(v === Infinity) return s += 'Infinity';

  if(radix < 1 || radix > 100) throw new RangeError('1-100');

  return this.valueOf().toPrecision(radix);
}

module.exports = Numeric;