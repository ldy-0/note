/**
 * 
 * 凡是位于速度相差较大的两种硬件之间，用于协调两者数据传输速度差异的结构，统称为缓存（cache）。
 * 缓存命中(Cache Hit): 访问数据在cache中
 * 缓存缺失(Cache Miss): 访问数据不在cache中
 * 基于效率而存储部分数据
 * 缓存相关概念： https://www.dazhuanlan.com/2019/12/16/5df6d6916103f/
 * 
 * FIFO(First In First Out)
 * LRU(Least recently used):  https://www.cnblogs.com/Dhouse/p/8615481.html
 * MRU(most recently used)
 * LFU(least frequently used) 适应性较差
 * NRU(Not recently used)(Clock): 循环链表
 *   hit标记置1,指针后移
 *   miss && full 淘汰标记为0, 如果没有 所有标记置0
 *   https://blog.csdn.net/m0_37677536/article/details/83622799
 * ARC(Adjustable Replacement Cache)
 *   https://louyuting.blog.csdn.net/article/details/105326025
 * 
 * 缓存污染: 因偶发性，周期性操作造成不常用数据被缓存
 * LRU-K
 * 2Q
 * MQ
 *   https://www.cnblogs.com/dj0325/p/8846406.html
 * 
 */