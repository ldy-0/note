/**
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * Doc
 * 
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 题目网站: https://blog.csdn.net/haimianjie2012/article/details/77899728
 * 每周一题: http://www.hihocoder.com/hiho/past
 * leetcode题解: http://bookshadow.com/weblog/
 * 
 * ML|statistic|BigData系列: http://blog.fens.me/series-algorithm/
 * 
 * 支配世界的十种算法: https://www.infoq.cn/article/mBKst3xjImwCqm5YPXOA
 * 核心算法: https://blog.csdn.net/m0_37907797/article/details/102661778
 * JavaScript-Algorithms: https://github.com/sisterAn/JavaScript-Algorithms
 * 
 * breaktracking(回溯): 操作可以被回退
 * 方法: 定义解空间 -> 确定解空间结构(树，图) -> DFS(查找可行解/最优解)
 * 详细讲解回溯算法 https://blog.csdn.net/gardenpalace/article/details/84625537
 * 
 */

/***
 * 
 * 
 * 集合: 一个，多个确定元素构成的整体 
 *   1. 确定性 （一个元素是否属于集合必须是确定的）
 *   1. 互异性（集合中的元素互不相同）
 * 子集：集合A中所有元素都属于集合B，集合A为B的子集，
 * 真子集：集合A中所有元素都属于集合B，集合B中有元素不属于集合A, 集合A为B的真子集
 * 补集：属于集合A但不属于集合B的所有元素组成的集合为B关于A的补集(A-B)
 * 集合: http://www.imooc.com/article/4625
 * 
 */


/**
 * 
 * sort: https://blog.csdn.net/ahaotata/article/details/89021241
 * mergeSort: https://www.cnblogs.com/DSNFZ/articles/7745785.html
 * heapSort: https://www.cnblogs.com/Java3y/p/8639937.html
 * 
 * 
 */

// nlogn
function quickSort(arr){
  return quick(arr, 0, arr.length - 1);

  function quick(arr, start, end){
    let i = start,
        j = end,
        v = arr[start];
    while(i < j){
      while(arr[j] >= v) j--;
      j < i ? j = i : arr[i] = arr[j];

      while(arr[i] <= v) i++;
      i > j ? i = j : arr[j] = arr[i];

      arr[i] = v;
    }

    if(end - start > 1){
      quick(arr, start, i - 1);
      quick(arr, i + 1, end);
    }

    return arr;
  }
}

// 
function mergeSort(arr, start, end){
  if(start === undefined) start = 0;
  if(end === undefined) end = arr.length - 1;

  let len = end - start,
      mid = Math.floor(len / 2) + start;
 
  if(len > 1){
    if(start !== mid)   mergeSort(arr, start, mid);
    if(mid + 1 !== end) mergeSort(arr, mid + 1, end);
  }

  // merge1(arr, start, mid + 1, end);
  merge(arr, start, mid + 1, end);

  console.log(start, mid, end, arr);
  return arr;
}

function merge(arr, start, mid, end) {
  let m = mid - 1,
      e = end,
      newArr = [];

  for(let i = end; i >= start; i--){
    newArr[i - start] = m < start ? arr[e--] : e < mid ? arr[m--] : arr[m] > arr[e] ? arr[m--] : arr[e--];
  }

  newArr.forEach((v, i) => arr[i + start] = v);
}

// 第一个数值依次和第二个数值起始值比较
// function merge1(arr, start, mid, end){
//   let i = start,
//       j = mid;

//   while(i < mid){
//     if(arr[i] > arr[j]){
//       [arr[i], arr[j]] = [arr[j], arr[i]];

//       for(let k = mid; k <= end; k++){ if(arr[k] > arr[k + 1]) [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]; }
//     }
    
//     i++;
//   }
// }

// 从两个数值起始处开始比较
// function merge(arr, start, mid, end){
//   let s = start,
//       m = mid,
//       i = 0,
//       len = end - start,
//       newArr = [];

//   while(i++ <= len){
//     // 必须先越界判断,防止s,m越界后取越界后值继续比较
//     if(m > end)              newArr.push(arr[s++]);
//     else if(s >= mid)        newArr.push(arr[m++]);
//     else if(arr[s] < arr[m]) newArr.push(arr[s++]);
//     else if(arr[m] < arr[s]) newArr.push(arr[m++]);
//     else                     newArr.push(arr[s++], arr[m++]), i++;

//   }

//   newArr.forEach((v, i) => (arr[start + i] = v));
// }

function heapSort(arr){
  for(let i = arr.length - 1; i >= 0; i--){
    heap(arr, i);
    console.log(arr);
    [arr[0], arr[i]] = [arr[i], arr[0]];
  }
}

function heap(arr, len){
  for(let i = len; i >= 0; i--){
    initHead(arr, i, len);
  } 

  function initHead(arr, i, len){
    let max = i,
        left = 2 * i + 1,
        right = left + 1;

    if(left <= len && arr[left] > arr[max]) max = left;
    if(right <= len && arr[right] > arr[max]) max = right;

    if(max !== i){
      [arr[max], arr[i]] = [arr[i], arr[max]];
      initHead(arr, max, len);
    }
  }
}

function execSort(){
  let arr = [3, 2, 5, 10, 3, 10, 234, 34, 1];

  console.time('sort');
  mergeSort(arr);
  // quickSort(arr);
  // heapSort(arr);
  console.timeEnd('sort');

  console.error(arr);
}
execSort();