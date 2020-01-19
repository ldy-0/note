// ordinary Object
const M = {};

Object.defineProperties(M, {
  // 10的自然对数
  'LN10':   { value: Math.LN10, },

  // E的以10为底对数
  'LOG10E': { value: Math.LOG10E, },

  'PI':     { value: Math.PI },

  'SQRT1_2':  { value: Math.SQRT1_2, },

  [Symbol.toStringTag]: { value: 'Math', configurable: true, },

});

// function 
M.log = function(v){}
M.log2 = function(v){}
M.log10 = function(v){}
M.log1p = function(v){}

M.abs = function(){

}

M.cbrt = function(v){
  if(v !== v)         return NaN;
  if(v === Infinity)  return Infinity;
  if(v === -Infinity) return -Infinity;
  // +-0

  return Math.cbrt(v);
}

M.pow = function(x, exponent){
  // NaN
  if(isNaN(exponent)) return NaN; 
  if(exponent === 0)  return 1;
  if(isNaN(x))        return NaN;

  // Infinity
  if(exponent === Infinity){
    if(Math.abs(x) > 1) return Infinity;
  }

}

/**
 * 极值: 在区间内存在一个点，点的左，右邻接点均大于或小于该点的值。
 * 最值：在区间内最大或最小值。
 * 
 * 导数和微分 https://www.zhihu.com/question/22199657/answer/115178055
 * 
 * 导数(切线斜率)
 * 变化率: f`(x) = lim(Δx -> 0)f(x + Δx) - f(x)/Δx = lim(x->a)f(x)-f(a)/(x - a) = dy/dx(导数也称为微分之商)
 * Δu
 * 
 * 微分
 * x被分为n份，lim(n->infinity) dx = x/n, dx为x的微分
 * 
 * 微分中值定理
 * 拉格朗日中值定理
 * 1. f(x)在[a, b]连续
 * 2. f(x)在(a, b)可导
 * ∃ξ∈(a, b) f`(ξ) = (f(b) - f(a))/(b - a)
 * 
 * 罗尔定理
 * 1. f(x)在[a, b]连续
 * 2. f(x)在(a, b)可导
 * 3. f(a) === f(b)
 * 存在ξ∈(a, b) f`(ξ) = 0
 * 
 * 洛必达法则
 * 1. 0/0, Infinity/Infinity型不定式
 * 2. f(a) == g(a) == 0;
 * lim(x->a)f(x)/g(x) = lim(x->a)(f(x) - f(a))/(x - a)/(g(x) - g(a))/(x - a) = lim(x->a)f`(x)/g`(x)
 * 
 * ξ: \u03be
 * ∀: \u2200
 * ∃: \u2203
 * ∈: \u2208
 * 
 * 全称量词符号：“∀”,存在量词符号：“∃”,为什么用这两个符号表示?  https://www.zybang.com/question/7750797295c91bad3b16cc55e48da7e5.html
 * 微分: https://zhuanlan.zhihu.com/p/45086452
 * 数学笔记28——不定式和洛必达法则: https://blog.csdn.net/sunbobosun56801/article/details/78722894
 * 高等数学系列: https://zhuanlan.zhihu.com/c_150693479
 * 
 */


module.exports = M;