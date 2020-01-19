function initCamera(program) {
  let camera = createCamera(2, 120, elm.clientWidth / elm.clientHeight, 1, 100);
  camera.translate(0, 20, 100).lookAt([0, 0, 0]);

  return window.camera = camera;
}

function createCamera(type, right, top, near, far){
  let o = {
    __proto__: matrix,
    proj: type == 1 ? getOrtho(-right, right, -top, top, near, far) : getPerspect(right, top, near, far),
  };

  o.lookAt = function(vector){
    let m = this.modeMatrix,
        coords = [m[12], m[13], m[14]],
        zVector = normalize(minute(coords, vector)),
        xVector = normalize(cross([0, 1, 0], zVector)),
        yVector = normalize(cross(zVector, xVector));
    
    [m[0], m[1], m[2]] = [xVector[0], xVector[1], xVector[2]];
    [m[4], m[5], m[6]] = [yVector[0], yVector[1], yVector[2]];
    [m[8], m[9], m[10]] = [zVector[0], zVector[1], zVector[2]];
  
    return this;
  }

  o.identity = function() {
    let proto = Reflect.getPrototypeOf(this);

    this.modeMatrix = proto ? proto.identity() : matrix.identity();

    return this;
  }

  o.identity();
  return o;
}