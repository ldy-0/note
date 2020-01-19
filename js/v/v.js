/**
 * 
 * Vue
 * 
 * vue教程  http://www.waibo.wang/bible/vue2/html/1/1.6.1.html
 * vue教程  https://cloud.tencent.com/developer/doc/1247
 * 
 * mixins
 * 1. override(component): data, computed, methods, filters
 * 2. 兼容append([mixin, component]): watch, liftCycle
 * 
 * config
 *   errorHandler 错误捕获hook(捕获lifeCycle, custom-event callback, dom-event callback)
 * 
 * Error
 * 1. Failed to resolve directive: modal 页面中使用了错误指令v-modal(本意是用v-model)
 * 2. Failed to mount component: template or render function not defined. 引入组件省略文件名,默认找js文件
 * https://segmentfault.com/a/1190000017114380
 * 
 * el,template,render https://blog.csdn.net/jiang7701037/article/details/83178630
 * 
 * source
 * mergeOption https://github.com/JerryYuanJ/blogs/issues
 * https://www.cnblogs.com/greatdesert/p/11011485.html 
 * https://www.cnblogs.com/yeujuan/p/10974365.html
 * _update https://zhuanlan.zhihu.com/p/40443337
 * patch函数 https://www.cnblogs.com/QH-Jimmy/p/7207242.html
 * createElement函数 https://blog.csdn.net/refreeom/article/details/90236763?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
 * 优化-静态标记 https://blog.csdn.net/qq_39200185/article/details/110392273
 * 
 * Vue的面试题 https://blog.csdn.net/huoren_no1/article/details/105339320
 */

// const Vue = require('vue');

// initial Vue Constructor & Vue.prototype
function initGlobalApi(){
  // initial options object: ordinary Object of prototype is null.
  Vue.options = Object.create(null);
  Vue.options._base = Vue;
  Vue.options.components = { keepAlive, transition, transitionGroup, };
}

function renderMixins() {
  Vue.prototype._v = createTextNode();
  Vue.prototype._e = createEmptyNode();

  Vue.prototype._render = function() {
    // call $options.render methods.
    // return Vnode;
  }
}

// init vue instance Object
function _init(options){
  const vm = this;
  
  vm.$options = mergeOptions(vm.constructor, options || {}, vm);
}

/**
 * 
 */
function Instance(){
	return {
		_c: function(tag, ){ return createElement(); },
	}
}

/**
 *
 * virtual : use a javascript object 表示 DOM element.
 * VNode是什么及作用 https://my.oschina.net/u/3060934/blog/3070708
 *
 */
function VNode(tag, data, children){
	return {
		tag,
		data,            // { staticClass: '', staticStyle: '', on: {}, attrs: {} },
		children,
		elm: null,       // real DOM element
		context: null,   // Vue instance object
		parent: null,    // component tag 生成的Vnode
		componentInstance: null, // Vue instance object
		componentOptions : null, // { props: {}, listeners: {}, children: [slot] },
		isStatic: false, // 
	};
}



/**
 * 
 * https://blog.csdn.net/qq_25324335/article/details/88312316
 * 
 */
function mergeOptions(parent, child, vm){
  let key, options = {};

  // check 配置项组件名

  // normalize

  for(key in parent) mergeField(key);
  for(key in child) !hasOwn(parent, key) ? mergeField(key) : null;

  function mergeField(key){
    let strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}

function normalize(){
  // props: ['name'] | { name: String } | { name: { type: String } } -> { name: { type: null|String } }	
  // directives: { dir: function(){} } -> { dir: { bind: function(){}, update: function(){} } }
  // inject: ['name'] | { name: '' } | { name: { name: '', }, } -> { name: { from: 'name'|'', name: '' } }
}

/******************************************************************************************************************************************************************************************/
/**
 * 
 * Router
 * 
 * 
 * next() 1. false 终止导航 2. '/' 导航重定向 3. Error 会被router.onError catch
 * 
 * scrollBehavior源码解析 https://www.cnblogs.com/kdcg/p/9376737.html
 * 
 */

let component = {
      // component守卫 在beforeEnter中注册函数调用后调用
      beforeRouteEnter(to, from, next){},
      // 在router beforeEach中注册函数调用后调用
      beforeRouteUpdate(to, from, next){},
      // 0
      beforeRouteLeave(to, from, next){},
    },
    routes = [
      {
        path: '/', // absolute url('/index') | relative url('index') | dynamic url('/user/:id')
        name: 'named', // 命名route(可通过{ name: 'named' }匹配) | anonymous route(只能通过path匹配)
        redirect: to => { return '/index' }, // 命名对象|path|function 
        alias: '/index',
        // children: [] // nested route
        component, // 
        beforeEnter(to, from, next){}, // route守卫 在组件beforeRouteEnter中注册函数调用前调用
      },
    ],
    // 
    router;

// router = new Router({ routes });

// router 守卫(全局守卫)
// beforeRouteLeave()调用后
// router.beforeEach((to, from, next) => {});
// 导航状态变为confirm前调用
// router.beforeResolve((to, from, next) => {});
// 导航状态变为confirm后调用
// router.afterEach((to, from) => {});

/**
 * 
 * Vue3源码导读 https://juejin.im/post/5d977f47e51d4578453274b3
 * vueRFC-作者 https://zhuanlan.zhihu.com/p/68477600
 * 
 */


 /****************************************************************************************************************************************************************************************/
 /**
  * 
  * frameWork
  * 
  */

/**
 * 
 * element-ui
 * 
 * element-ui 组件源码分析整理笔记目录 https://www.bbsmax.com/A/x9J2kYZj56/
 * 
 * issue
 *  DateTimePicker组件
 *    selectableRange设置无效(无法限制时间)  https://segmentfault.com/q/1010000017164876/a-1020000017166629
 * 
 */

 /***
  * 
  * vant
  * tabs组件sticky移动端适配  https://blog.csdn.net/qq_45379479/article/details/106861519
  * 
  */
 
 /**
  * 
  * swiper
  * 
  * vue-awesome-swiper
  * 
  * issue
  * 1. vue-awesome-swiper无法自动播放
  *    1. 修改引用方式 https://github.com/surmon-china/vue-awesome-swiper/issues/680#issuecomment-666364812
  *    2. 回退swiper版本  https://github.com/surmon-china/vue-awesome-swiper/issues/683
  * 2. 开启loop时,轮播会默认显示最后一个
  *     解决方法: 在获取数据后再创建swiper组件(v-if)。
  * 3. 点击事件中第一个参数不是真实元素的索引,第二个才是
  * 4. 操作后(点击，滑动),自动播放失效
  *    解决方法: autoplay: { disableOnInteraction: false, }
  * 
  */


 /****************************************************************************************************************************************************************************************/
 /**
  * 
  * project
  * 
  * base comonent: 不影响全局状态的component
  * 基础组件自动化全局注册
  * 
  */

 /**
  * 
  * cli(工程初始化)
  * 
  * 从远程clone项目, 获取输入信息后替换指定信息, 输出
  * vue init命令逻辑 https://segmentfault.com/a/1190000011643581?utm_source=sf-related
  * vue-cli详解 https://blog.csdn.net/haochangdi123/article/details/80274210
  * 
  * 
  * 
  */