/**
 *
 * 测试文件
 *
 */

let level = 0;

function merge(arr, start, end){
  if(start === undefined) start = 0;
  if(end === undefined) end = arr.length - 1;

  // console.error(`-`.repeat(level++), start, end);
  let len = end - start,
      mid = Math.floor(len / 2) + start;

  if(len > 1){
    merge(arr, start, mid);
    merge(arr, mid + 1, end);
  }

  let i = 0,
      s = start,
      m = mid + 1,
      newArr = [];

  while(i++ <= len){
    if(m > end)              newArr.push(arr[s++]);
    else if(s >= mid + 1)    newArr.push(arr[m++]);
    else if(arr[s] < arr[m]) newArr.push(arr[s++]);
    else if(arr[m] < arr[s]) newArr.push(arr[m++]);
    else                     newArr.push(arr[s++], arr[m++]);
  }

  newArr.forEach((v, i) => arr[start + i] = v);
  // level--;

  return arr;
}


let arr = [3, 2, 1];
merge(arr);
console.error(': ', arr);


// 
module.exports = {

}
