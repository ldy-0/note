
/**
 * 
 * Type inspect
 * undefined, null 可以赋值给其他类型
 * 
 */

let str: string = `this is string`;
let num: number = 1;
let boolean: boolean = true;
let un: void = null;
let any: any = 1;
any = '111';

let arr1: Array<number> = [1, 2];
let arr2: number[] = [1, 2];
// array length, type fixed
let tuple: [number, string] = [1, ''];

/**
 * 
 * 没有初始值，值为上个元素值+1
 * 
 */
enum en { 
  yes = 11, 
  no, 
  m = 10,
  n,
};

// type assert

// restrain
interface config {
  readonly id: any,
  name?: string,
  [index: number]: string, // index sign
  [propName: string]: any,
}

// overload
function testConfig(id: number): void;
function testConfig(this: void, opt: config): void;
function testConfig(opt){
  console.error(opt);
}

testConfig(1);
testConfig({ id: 1, type: 1, });

// 泛型
function f<T>(n: T): T{
  return n;
}

console.error(f(4), f('str'));

/**
 * 
 * tsDOC https://www.tslang.cn/docs/handbook/advanced-types.html
 * 
 */

// 最小特权原则  https://cloud.tencent.com/developer/article/1328183