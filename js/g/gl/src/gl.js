function initGL(){
  window.elm = document.getElementById('gl');
  window.gl = elm.getContext('webgl');

  elm.width = elm.clientWidth;
  elm.height = elm.clientHeight; 
  gl.viewport(0, 0, elm.width, elm.height);

  // set clearColor: https://blog.csdn.net/biggbang/article/details/19230575
  gl.clearColor(0, 0, 0, 1);
  gl.clearDepth(1.0);
  // use 清除值 clear 指定buffer: https://blog.csdn.net/siyue0211/article/details/74783966
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  // gl.enable(gl.BLEND);
  // gl.blendFunc(gl.BLEND_ALPHA, gl.ONE);

  let textureProgram = createProgram(vShaderTexure, fShaderTexture),
      colorProgram = createProgram(vShaderTexure, fShaderColor);
  if(!textureProgram) return console.log('texture program create fail');
  if(!colorProgram) return console.log('color program create fail');

  initCamera();

  window.program = textureProgram;
  window.textureProgram = textureProgram;
  window.colorProgram = colorProgram;

  render();
}

let vShaderTexure = `
  attribute vec4 a_position;
  attribute vec3 a_normal;
  attribute vec4 a_color;
  attribute vec2 a_texture;

  uniform vec3 u_light;
  uniform vec3 u_viewPoint;
  uniform mat4 u_mode;
  uniform mat4 u_mode_it;
  uniform mat4 u_view;
  uniform mat4 u_proj;

  varying vec2 v_texture;
  varying vec4 v_color;
  varying vec3 v_light;
  varying vec3 v_normal;
  void main(){

    gl_Position = u_proj * u_view * u_mode * a_position;

    v_light = u_light - (u_mode * a_position).xyz;

    v_normal = (u_mode_it * vec4(a_normal, 1)).xyz;

    v_color = a_color;
    v_texture = a_texture;
  }`;

// 
let fShaderTexture = `
  precision mediump float;
  uniform sampler2D u_sampler;

  varying vec3 v_light;
  varying vec3 v_normal;
  varying vec2 v_texture;

  void main(){
    float light = dot(normalize(v_light), normalize(v_normal));

    gl_FragColor = texture2D(u_sampler, v_texture);
  }`;

  // uniform sampler2D u_sampler;
let fShaderColor = `
  precision mediump float;

  varying vec4 v_color;
  varying vec3 v_light;
  varying vec3 v_normal;

  void main(){
    float light = dot(normalize(v_light), normalize(v_normal));

    gl_FragColor = vec4(v_color.rgb * light, v_color.a);
  }`;

function createProgram(vShaderSource, fShaderSource){
  let program = gl.createProgram(),
      v_shader = gl.createShader(gl.VERTEX_SHADER),
      f_shader = gl.createShader(gl.FRAGMENT_SHADER);
  
  gl.shaderSource(v_shader, program.vss = vShaderSource);
  gl.compileShader(v_shader);
  if(!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) return console.log('%c vertex shader:', 'color: green;', gl.getShaderInfoLog(v_shader));

  gl.shaderSource(f_shader, program.fss = fShaderSource);
  gl.compileShader(f_shader);
  if(!gl.getShaderParameter(f_shader, gl.COMPILE_STATUS)) return console.log('%c fragment shader:', 'color: green;', gl.getShaderInfoLog(f_shader));

  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);
  gl.linkProgram(program);
  console.log(gl.getProgramParameter(program, gl.LINK_STATUS));

  return initProgram(program);
}

// mount atribute
function initProgram(program){
  if(!program) return ;

  let arr = program.fss.split(';\n').filter(v => /^\s*(uniform|attribute)/.test(v)).map(v => v.replace(/.*\s/, ''));

  arr.forEach(v => program[v] = v[0] === 'u' ? gl.getUniformLocation(program, v) : gl.getAttribLocation(program, v));

  program.a_position = gl.getAttribLocation(program, 'a_position');
  program.a_color    = gl.getAttribLocation(program, 'a_color');
  program.a_normal   = gl.getAttribLocation(program, 'a_normal');
  program.a_texture  = gl.getAttribLocation(program, 'a_texture');

  program.u_proj = gl.getUniformLocation(program, 'u_proj');
  program.u_view = gl.getUniformLocation(program, 'u_view');
  program.u_mode = gl.getUniformLocation(program, 'u_mode');
  program.u_mode_it = gl.getUniformLocation(program, 'u_mode_it');
  program.u_light = gl.getUniformLocation(program, 'u_light');

  Object.keys(program).some(v => { if(/^[au]_/.test(v) && (program[v] == -1 || program[v] == null)) console.log('%c', 'color: red;', `${v}位置不正确!`); });

  // 开启后，drawArrays,drawElements调用时会检查是否设置
  gl.enableVertexAttribArray(program.a_position);
  gl.enableVertexAttribArray(program.a_normal);

  return program;
}

let O = {};
O.toOrigin = function(){
    let vertex = this.vertex,
        length = this.itemLength + (this.textureLength || 0),
        t = vertex.slice(0, length);

    for(let i = 0, len = vertex.length; i < len; i += length){
      vertex[i] -= t[0];
      vertex[i + 1] -= t[1];
      vertex[i + 2] -= t[2];
    }

  this.t = t;
}

initGL();

/****** Event ************************************************************************************************************************************/
// stats
let memory = performance.memory,
    div = document.createElement('div');
div.style = 'position: fixed; top: 0; left: 0;';
div.innerText = `${(memory.usedJSHeapSize / 1048576).toFixed(2)} / ${(memory.totalJSHeapSize / 1048576).toFixed(2)}`;
document.body.appendChild(div);

elm.addEventListener('webglcontextlost', e => e.preventDefault());
elm.addEventListener('webglcontextrestored', e => { initGL(); });

window.onresize = e => {
  gl.viewport(0, 0, elm.width = elm.clientWidth, elm.height = elm.clientHeight);

  initCamera();
};

let timer, cacheX, cacheY, offsetX, offsetY, pitch = 0, yaw = 0;
window.elm.onmousemove = function(e) {
  let [x, y] = [e.clientX, e.clientY];
  [offsetX, offsetY] = [x - (cacheX || x), y - (cacheY || y)];

  yaw += offsetX / 10;
  pitch = Math.min(Math.max(offsetY / 5, -90), 90);

  [cacheX, cacheY] = [e.clientX, e.clientY];
  // console.log(yaw, pitch);

  // if(offsetX !== 0) camera.rotateY(yaw);
  // if(offsetY !== 0) camera.rotateX(pitch);
}


// 已知三点求平面的法向量 —— 两种方法 https://blog.csdn.net/sinat_41104353/article/details/84963016
function cross(v1, v2){
  return [
    v1[1] * v2[2] - v2[1] * v1[2],
    v1[2] * v2[0] - v2[2] * v1[0],
    v1[0] * v2[1] - v2[0] * v1[1],
  ];
}

function normalize(v){
  let val = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] / val, v[1] / val, v[2] / val];
}

function minute(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

/**
 * Error
 * 常见错误: https://blog.csdn.net/github_38108899/article/details/90443260
 * 
 * 1. drawArrays: no buffer is bound to enabled attribute 属性开启未设置(未调用vertexAttribPointer)
 * 
 * 
 * 问题：
 * 1. 深度冲突: https://www.cnblogs.com/eco-just/p/10686934.html
 * 
 */

/*************************************************************************************************************/

/**
 * 
 * doc
 * 
 * 代码结构 https://blog.csdn.net/zhulx_sz/article/details/78338109
 * http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/core/Face3
 * 专注30年 https://blog.csdn.net/qq_30100043/article/details/80186810
 * https://blog.csdn.net/qq_35158695/article/details/81359884
 * helper https://blog.csdn.net/weixin_39452320/article/details/84714094
 * 
 */

/**
 * 
 * source
 * three源码注释 https://blog.csdn.net/omni360/article/details/41114533?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
 * lod sources https://blog.csdn.net/u011209953/article/details/37863701
 * Object3D类 https://www.jb51.net/article/32861.htm
 * 
 */

// refs
// https://www.oschina.net/p/threejs
// http://www.wjceo.com/blog/threejs/
// https://www.cnblogs.com/hsprout/p/7865593.html
// https://blog.csdn.net/birdflyto206/article/details/52414187
// https://blog.csdn.net/u014306293/article/details/72522834
// three https://www.cnblogs.com/cndotabestdota/p/5746053.html
// glsl https://www.cnblogs.com/edwardloveyou/p/7806258.html
// 入门 https://www.jb51.net/article/33518.htm
// matrix https://www.jb51.net/article/158076.htm
// 【CSON原创】HTML5游戏框架cnGameJS开发实录 https://www.cnblogs.com/Cson/archive/2012/02/12/2348280.html
// 流体模拟 https://baiyue.one/archives/1217.html

/**
 * wGL
 * 
 * 《GPU编程与CG语言之阳春白雪下里巴人》- 第二章（GPU 图形绘制管线）: https://www.jianshu.com/p/348f4e974c9d
 * 
 * 原生WebGL开发: https://blog.csdn.net/sunqunsunqun/article/category/9265727
 * glsl:         http://stack.gl/#learning
 * glsl中文手册:  https://github.com/wshxbqq/GLSL-Card
 * WebGL Specification https://www.khronos.org/registry/webgl/specs/latest/1.0/
 * 
 * webGL系列: https://blog.csdn.net/qq_30100043/article/details/72911414?utm_source=blogkpcl2
 * WebGL学习笔记  https://www.cnblogs.com/hammerc/category/1504161.html
 * 
 */

/**
 * 
 * works
 * 
 * 带着canvas去流浪（11） https://bbs.huaweicloud.com/blogs/9cbe4ea0a11f11e9b759fa163e330718
 * 专注前端30年 https://blog.csdn.net/qq_30100043/article/details/74178101
 * 垃圾分类系统:  http://blog.chinaunix.net/uid-69950884-id-5826103.html
 * 
 */

/**
 * 
 * 模型变换 https://blog.csdn.net/wangdingqiaoit/article/details/51531002
 * 
 * 傅立叶变换 
 * 韩昊  https://zhuanlan.zhihu.com/p/19763358
 *       https://blog.csdn.net/randy_01/article/details/83217314
 *       https://blog.csdn.net/v_JULY_v/article/details/6196862
 * 数字图像处理
 *       https://blog.csdn.net/weixin_40851250/article/details/84780221
 *       https://blog.csdn.net/Einstellung/article/details/77531023
 * 
 * gpuGame书 https://developer.nvidia.com/gpugems/GPUGems/gpugems_pref01.html 
 */