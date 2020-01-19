function render() {
  let scene = [];

  gl.useProgram(program);
  gl.uniformMatrix4fv(program.u_proj, false, camera.proj);
  gl.useProgram(program = colorProgram);
  gl.uniformMatrix4fv(program.u_proj, false, camera.proj);

  let tri = createTri();
  let coords = createCoord();
  let land = createLand();
  let leftWall = createLeftWall();
  let rightWall = createRightWall();

  scene.push(coords, tri, land);
  scene.push(leftWall, rightWall);

  let deg = 0;
  requestAnimationFrame(animate);

  function animate(){
    if(deg == 360) deg = 0;
    tri.rotateY(deg += 0.5);
    leftWall.rotateY(270);
    rightWall.rotateY(90);

    camera.identity().rotateY(yaw).rotateX(pitch).translate(0, 20, 100);
    camera.viewMatrix = matrix.getInverse4(camera.modeMatrix);

    scene.forEach(v => {
      v.texture ? gl.useProgram(program = textureProgram) : gl.useProgram(program = colorProgram);
      gl.uniformMatrix4fv(program.u_view, false, camera.viewMatrix);

      v.draw();
    });

    requestAnimationFrame(animate);
  }
}

function createCoord() {
  let cs = {
    vertex: [0, 0, 0,
             100, 0, 0,
             0, 100, 0,
             0, 2, 100,],  
    index: [0, 1, 0, 2, 0, 3],
    color: [255, 0, 0, 1, 0, 255, 0, 1, 0, 0, 255, 1],
    itemLength: 3,
    colorLength: 4,
    init(){ this.modeMatrix = this.identity(); },
  }

  Reflect.setPrototypeOf(cs, matrix);
  setBuffer(cs);
  cs.init();

  cs.draw = function(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(program.a_position, this.itemLength, gl.FLOAT, false, 0, 0);
    gl.disableVertexAttribArray(program.a_normal);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.enableVertexAttribArray(program.a_color);
    gl.vertexAttribPointer(program.a_color, this.colorLength, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);

    gl.uniformMatrix4fv(program.u_mode, false, this.modeMatrix);

    gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_BYTE, 0);

    gl.enableVertexAttribArray(program.a_normal);
    gl.disableVertexAttribArray(program.a_color);
    this.init();
  };

  return cs;
}

function createTri(){
  let tri = {
    vertex: [0, 0,  80,
             20, 0, 80,
             0, 20, 80,],
    color: [255, 0, 0, 1,  0, 255, 0, 1,  255, 255, 0, 1],
    itemLength: 3,
    colorLength: 4,
    __proto__: matrix,
    init(){ this.modeMatrix = this.identity(); }
  };

  Object.assign(tri, O);
  tri.toOrigin();
  tri.init();
  setBuffer(tri);

  tri.draw = function(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(program.a_position, this.itemLength, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(program.a_normal, this.itemLength, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.enableVertexAttribArray(program.a_color);
    gl.vertexAttribPointer(program.a_color, this.colorLength, gl.FLOAT, false, 0, 0);

    this.translate(this.t);
    gl.uniformMatrix4fv(program.u_mode, false, this.modeMatrix);
    gl.uniformMatrix4fv(program.u_mode_it, false, this.transpose(this.getInverse4(this.modeMatrix)));

    gl.drawArrays(gl.TRIANGLES, 0, this.length);

    gl.disableVertexAttribArray(program.a_color);
    this.init();
  };

  return tri;
}

function createLand() {
  let obj = Object.create(matrix);

  obj.vertex = [
      -48, 0, 96, 0, 8,
      48, 0, 96,  8, 8,
      48, 0, 0,   8, 0,
      -48, 0, 0,  0, 0,
  ],
  obj.index = [0, 1, 2, 0, 2, 3];
  obj.itemLength = 3;
  obj.textureLength = 2;
  obj.init = function(){ this.modeMatrix = this.identity(); },
  
  setBuffer(obj);

  obj.init();

  getImg('/img/grassLand.jpg', img => obj.texture = setTexture(obj.img = img));

  obj.draw = function(){
    if(!this.img) return console.log('land texture no load');
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.uniformMatrix4fv(program.u_mode, false, this.modeMatrix)
    gl.uniformMatrix4fv(program.u_mode_it, false, this.transpose(this.getInverse4(this.modeMatrix)));

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
    gl.vertexAttribPointer(program.a_position, this.itemLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(program.a_texture);
    gl.vertexAttribPointer(program.a_texture, this.textureLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(program.a_normal, this.itemLength, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
    gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_BYTE, 0);

    gl.disableVertexAttribArray(program.a_texture);
    this.init();
  };

  return obj;
}

function createLeftWall(){
  let obj = {
    vertex: [
      0, 0, 0,     0, 1,
      100, 0, 0,   1, 1,
      100, 50, 0, 1, 0,
      0, 50, 0,   0, 0,
    ],
    index: [0, 1, 2, 0, 2, 3,],
    itemLength: 3,
    colorLength: 4,
    textureLength: 2,
    __proto__: matrix,
    init(){ this.modeMatrix = this.identity(); },
  };

  obj.init();
  setBuffer(obj);

  getImg('/img/qiang.png', img => obj.texture = setTexture(obj.img = img));

  obj.draw = function(){
    if(!this.img) return console.log('left wall texture no load');
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(program.a_position, this.itemLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(program.a_texture);
    gl.vertexAttribPointer(program.a_texture, this.textureLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(program.a_normal, this.itemLength, gl.FLOAT, false, 0, 0);

    this.translate(-13, 0, 0);
    gl.uniformMatrix4fv(program.u_mode, false, this.modeMatrix);
    gl.uniformMatrix4fv(program.u_mode_it, false, matrix.transpose(matrix.getInverse4(this.modeMatrix)));

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
    gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_BYTE, 0);

    gl.disableVertexAttribArray(program.a_texture);
    this.init();
  };

  return obj;
}

function createRightWall(){
  let obj = {
    vertex: [
      0, 0, 0,     0, 1,
      100, 0, 0,   1, 1,
      100, 50, 0, 1, 0,
      0, 50, 0,   0, 0,
    ],
    index: [0, 1, 2, 0, 2, 3,],
    itemLength: 3,
    colorLength: 4,
    textureLength: 2,
    __proto__: matrix,
    init(){ this.modeMatrix = this.identity(); },
  };

  Object.assign(obj, O);
  obj.init();
  setBuffer(obj);

  getImg('/img/qiang.png', img => obj.texture = setTexture(obj.img = img));

  obj.draw = function(){
    if(!this.img) return console.log('right wall texture no load');
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(program.a_position, this.itemLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(program.a_texture, this.textureLength, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(program.a_texture);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(program.a_normal, this.itemLength, gl.FLOAT, false, 0, 0);

    this.translate(24, 0, 100);
    gl.uniformMatrix4fv(program.u_mode, false, this.modeMatrix);
    let it = matrix.transpose(matrix.getInverse4(this.modeMatrix));
    gl.uniformMatrix4fv(program.u_mode_it, false, it);
    // gl.uniform3fv(program.u_light, [25, 25, 70]);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
    gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_BYTE, 0);

    gl.disableVertexAttribArray(program.a_texture);
    this.init();
  };

  return obj;
}

/***** util ********************************************************************************************************************************************************************************/
function setBuffer(obj) {
  let vertex = obj.vertex,
      index = obj.index,
      k = 0,
      normal = [];

  obj.length = obj.index ? obj.index.length : Math.trunc(obj.vertex.length / obj.itemLength);

  for(let i = 0, len = obj.length / 3; i < len; i ++){
    let k1 = index ? index[k] * 5 : 0,
        k2 = index ? index[k + 1] * 5 : 0,
        k3 = index ? index[k + 2] * 5 : 0,
        v1 = obj.index ? [vertex[k2] - vertex[k1], vertex[k2 + 1] - vertex[k1 + 1], vertex[k2 + 2] - vertex[k1 + 2]]
                       : [vertex[k + 3] - vertex[k], vertex[k + 4] - vertex[k + 1], vertex[k + 5] - vertex[k + 2]];
        v2 = obj.index ? [vertex[k1] - vertex[k3], vertex[k1 + 1] - vertex[k3 + 1], vertex[k1 + 2] - vertex[k3 + 2]]
                       : [vertex[k] - vertex[k + 6], vertex[k + 1] - vertex[k + 7], vertex[k + 2] - vertex[k + 8]];
          
    let n = normalize(cross(v1, v2));
    normal.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
    k += obj.index ? 3 : 9;
  }
  obj.normal = normal;

  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer = gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.vertex), gl.STATIC_DRAW);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer = gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.normal), gl.STATIC_DRAW);

  if(obj.index){
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.IBO = gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(obj.index), gl.STATIC_DRAW);
  }

  if(obj.color){
    obj.color = obj.color.map((v, i) => (i + 1) % 4 === 0 ? v : v / 255);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer = gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.color), gl.STATIC_DRAW);
  }
}

function setTexture(img) {
  if(!img) return console.log(`1001: 纹理图片为空!`);
  // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  let texture = gl.createTexture();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 0, 255, 255, 255]));

  // texture没有渲染原因： http://www.it1352.com/880916.html
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.CLAMP_TO_EDGE
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

  // 压缩纹理: http://www.jiazhengblog.com/blog/2017/02/16/3076/

  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

/**
 * 
 * 地面: https://www.cnblogs.com/ljzc002/p/11105496.html
 * 
 */

function getImg(src, cb){
  // return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', e => cb(img));
    img.addEventListener('error', e => console.log(e));
    img.crossOrigin = 'anonymous';
    img.src = src;
  // });
}