/**
 * 
 * Date instance: an ordinary object with _datevalue attribute(utc).
 * 
 */

function Time(){
  let len = arguments.length;  

  if(!Time.prototype.isPrototypeOf(this)){
    return toDateString(t);
  }

  if(!len){
    return { _dateValue: t, __proto__: Date.prototype, };
  }

  if(len == 1){
    let t;
    if(typeof arguments[0] === object && arguments[0] instanceof Date){
      t = arguments[0]._dateValue;
    }else{
      let v = toPrimitive(arguments[0]);
      t = typeof v === 'string' ? Date.parse(v) : toNumber(v);
    }

    return { _datevalue: t, __proto__: Date.prototype };
  }

  if(len >= 2){
    let [y, m] = [toNumber(arguments[0]), toNumber(arguments[1])],
        date = arguments[2] || 1,
        hour = arguments[3] || 0,
        minute = arguments[4] || 0,
        second = arguments[5] || 0,
        ms = arguments[6] || 0; 
    
    if(isNaN(y)) y = NaN; 
    y = toInteger(y);
    if(y >= 0 && y <= 99) y = 1900 + y;

    return { _dateValue: utc(t), __proto__: Date.prototype, };
    
  }
}

Time.parse = function(str){
  str = toString(str);

  // ISO 8601 format
  // custom yyyy/mm/dd hh:mm:ss
}

// 输入时间为utc时间
Time.UTC = function(){}

Time.prototype = Object.create(Object.prototype, {
  valueOf(){ if(typeof this === 'object' && this._datevalue) return this._datevalue; throw new TypeError('no Date instance'); },

  getTime(){ return this.valueOf(); },
  getTimezoneOffset(){ let v = this.valueOf(); return v - local(v) / 60000; },
  getUTCSeconds(){ 
    let v = this.valueOf();

    if(isNaN(v)) return NaN;

    return Math.floor(v / 1000) % 60; 
  },
  getSeconds(){ return local(this.getUTCSeconds()); },

  toString(){ return toDateString(this.valueOf()); },
  toDateString(){ return date(toDateString(this.valueOf())); },
  toTimeString(){ return time(toDateString(this.valueOf())); },
  toISOString(){ return `yyyy-mm-ddThh:mm:ss.sssZ` },
  toJSON(){
    if(typeof this == 'number' && !isFinite(this)) return null;
    return this.toISOString();
  },

  setTime(t){ this._datevalue = Timeclip(toNumber(t)); },
});

// 周 月日年 时分秒 GMT(时区)
function toDateString(t){
  if(typeof t === 'number') throw new TypeError('error'); 

  if(isNaN(t)) return 'Invalid Date';
  return `weekday month day year hour:minute:second GMT+-hourminute (timezone name)`;
}

function Timeclip(t){
  if(!isFinite(t) || Math.abs(t) < 8.64e15) return NaN;

  return toInteger(t);
}

module.exports = {
  Time,
}