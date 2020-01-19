/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * 
 * Doc 
 * 
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * 
 * <<HTML5 Canvas开发详解>>book:  http://book.51cto.com/art/201711/556674.htm
 * 
 * engine 
 * cax:  https://www.cnblogs.com/iamzhanglei/archive/2018/06/21/9207363.html
 * 
 */
initCtx();

function initCtx(){
  let ctxCollection = document.getElementsByTagName('canvas'),
      ctx = ctxCollection[0] ? ctxCollection.getContext('2d') : null;

  if(!ctx) return console.warn(`initCtx error`);

  // console.error(ctx.width, ctx.height);
  ctx.fillRect(0, 0, 100, 100);
  ctx.font = '30px serif';
}


function doc(){
  // issue
  // canvas图片绘制跨域问题解决方案Tainted canvases may not be exported  https://segmentfault.com/a/1190000014478087

  // app
  // canvas 微信海报分享 https://www.jb51.net/html5/595770.html
  // https://blog.csdn.net/qyaroon/article/details/51916150
  // https://www.cnblogs.com/superlizhao/p/8729190.html
  //  Canvas 下雪背景引发的性能思考 https://juejin.im/post/5c8a5a286fb9a049d05e9bd4#heading-0
  // save和restore https://www.cnblogs.com/fangsmile/p/9530226.html
  // 下雨 https://segmentfault.com/a/1190000004699623
}