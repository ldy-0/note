// const LIB = THREE;
// const Vector3 = THREE.Vector3,
   
//       Face3 = THREE.Face3,

//       Matrix4 = THREE.Matrix4,

//       Geometry = THREE.Geometry,
//       BufferGeometry = THREE.BufferGeometry,

//       Shape = THREE.Shape,

//       MeshBasicMaterial = THREE.MeshBasicMaterial,

//       Line = THREE.Line,
//       Mesh = THREE.Mesh;

// // scene bound
// const X_LENGTH = Y_LENGTH = Z_LENGTH = 20;

// 
// let renderer = new THREE.WebGLRenderer(),
//     // scene 
//     scene = new THREE.Scene(),
//     // OrthographicCamera
//     camera = new THREE.OrthographicCamera(-X_LENGTH/2, X_LENGTH / 2, Y_LENGTH / 2, -Y_LENGTH / 2, 1, Z_LENGTH + 1);
//     // perspectiveCamera
//     // camera = new THREE.PerspectiveCamera(60, 1, Math.sqrt(3) - 1, Math.sqrt(3) * 2 + 1);

// 
// document.body.appendChild(renderer.domElement);

// Render Init Config
// initRenderer(renderer);

// initCamera();

// x,y Axis
// initAxis();

// initSpotLight();

// initBufferGeometry();

// let geometry = initGeometry();

// initCube();
// initSphere(true);
// initCylinder();
// initPolyhedron();

// 2
// initFace2();
// initShape();

// initParametic();

// initFont();

// loop();


// # renderer
function initRenderer(renderer){
  renderer.setSize(200, 200);
  renderer.setClearColor('#fff');
  renderer.shadowMap.enable = true;
}

// #camera
function initCamera(){
  if(camera.type === 'PerspectiveCamera'){
    camera.position.x = camera.position.y = 0;
    camera.position.z = Math.sqrt(3) * 3;
  }

  if(camera.type === 'OrthographicCamera'){
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;

    // camera.rotation = Math.PI / 2;
  }

  camera.lookAt(scene.position);
}

function loop(){
  let z = camera.position.z;

  // geometry.rotateY(0.05);

  requestAnimationFrame(loop);

  renderer.render(scene, camera);
}

// #axis
function initAxis(){
  let xVertice = [ 
        [ -X_LENGTH / 2, 0, 0 ],
        [ X_LENGTH / 2, 0, 0 ],
      ],
      yVertice = [
        [ 0, -Y_LENGTH / 2, 0 ],
        [ 0, Y_LENGTH / 2, 0 ],
      ],
      zVertice = [
        [ 0, 0, 9 ],
        [ 0, 0, -11 ]
      ];

  const xAxis = initLine(xVertice, '#000'),
        yAxis = initLine(yVertice, '#f00'),
        zAxis = initLine(zVertice, '#00f');

  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);

  if(camera.type === 'PerspectiveCamera'){

    let l = initLine([ [-0.5, 0, Math.sqrt(3) * 2], [0.5, 0, Math.sqrt(3) * 2] ], 'green');
    let farLine = initLine([ [-1.5, 0, Math.sqrt(3)], [1.5, 0, Math.sqrt(3)] ], '#f00');
    scene.add(l);
    scene.add(farLine);

  }
}

/**
 *  
 * # Mesh
 * 
 */

// # bufferGeometry
function initBufferGeometry(){ 

  let bufferGeometry = new BufferGeometry(),
      material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),
      mesh = new Mesh(bufferGeometry, material),
      views, bufferAttribute;

  views = new Float32Array( [ 
    -2, 0, 2,  2, 0, 2,  2, 0, -2,  
    -2, 0, 2,  -2, 0, -2,  2, 0, -2,
  ] );
  bufferAttribute = initBufferAttribute(views, 3); 

  bufferGeometry.addAttribute('position', bufferAttribute);

  rotateX(bufferAttribute); // bufferGeometry.rotateX

  scene.add(mesh);

}

// buffer和cache https://www.cnblogs.com/mlgjb/p/7991903.html
// 对TypedArray封装
function initBufferAttribute(view, itemSize){
  let ba = new LIB.BufferAttribute(view, itemSize);
  // TypedArray 数据项个数 数据项大小
  // console.error(ba.array, ba.count, ba.itemSize);

  // 数据传输到gpu后回调
  ba.onUploadCallback = (argu) => console.error(argu);

  return ba;
}

// 
function initGeometry(){

  let geometry = new THREE.Geometry(),
      material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, }),
      mesh = new Mesh(geometry, material),
      aVertice, aVertexColor, aFace;

  aVertice = [
    new THREE.Vector3(-2, 0, 2),
    new THREE.Vector3(2, 0, 2),
    new THREE.Vector3(2, 0, -2),
  ];

  aVertexColor = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff),
  ];

  face1 = new THREE.Face3(0, 1, 2);
  face1.vertexColors = aVertexColor;

  aFace = [face1];

  geometry.vertices = aVertice;
  geometry.faces = aFace;

  // geometry.computeBoundingBox();
  // geometry.computeBoundingSphere();
  // console.error(geometry.boundingBox, geometry.boundingSphere);

  scene.add(mesh);
  return geometry;

}

// #Cube/Box(new)
function initCube(){

  let cubeGeometry = new THREE.BoxGeometry(2, 2, 2),
      material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } ),
      cube = new THREE.Mesh( cubeGeometry, material );

  scene.add(cube);

}

// #sphere
function initSphere(helper){

  let sphereGeometry = new THREE.SphereGeometry(1),
      material = new THREE.MeshBasicMaterial({ color: '#0f0', wireframe: true }),
      sphere = new THREE.Mesh(sphereGeometry, material);
  
  sphere.position.set(0, 2, 0);

  if(helper){
    this.initBoxHelper(sphere, 0xf0f000);
  }

  scene.add(sphere);

}

// #cylinder
function initCylinder(){

  let cylinderGeometry = new THREE.CylinderGeometry(1, 2, 2, 4),
      basicMaterial = new THREE.MeshBasicMaterial({ color: '#000', wireframe: true }),
      cylinder = new THREE.Mesh(cylinderGeometry, basicMaterial);

  cylinder.position.set(0, 0, 0);

  scene.add(cylinder);

}

// #polyhedron
function initPolyhedron(){

  let vertices = [ -1, 0, 1,  1, 0, 1,  1, 2, 1,  -1, 2, 1,  0, 1, 3, ],
      // vertices = [ -1, 0, 1,  1, 0, 1,  1, 2, 1,  -1, 2, 1,  -1, 0, 3,  1, 0, 3,  1, 2, 3,  -1, 2, 3, ],
      // faces = [ 0, 1, 2,  0, 2, 3,  0, 3, 4,  0, 4, 8,  0, 1, 4,  1, 4, 5,  1, 5, 6,  1, 2, 6,  2, 3, 7,  2, 6, 7,  4, 5, 6,  4, 6, 7 ],
      // faces = [ 2, 1, 0,  0, 3, 2,  0, 7, 3,  ],
      faces = [ 0, 1, 2,  0, 2, 3,  0, 1, 4,  1, 2, 4,  2, 3, 4,  3, 0, 4 ],
      polyhedronGeometry = new THREE.PolyhedronGeometry(vertices, faces, 4, 1),
      material = new THREE.MeshBasicMaterial({ color: '#ccc', wireframe: true, }),
      polyhedron = new THREE.Mesh(polyhedronGeometry, material);

  // console.error(polyhedronGeometry.vertices);

  scene.add(polyhedron);

}

// #plane
function initFace2(){

  let planeGeometry = new LIB.PlaneGeometry(5, 5, 1, 1),
      circleGeometry = new LIB.CircleGeometry(5, 20, 0, 45 * Math.PI / 180),
      lambertMaterial = new LIB.MeshLambertMaterial({ color: 0x00ff00, wireframe: true }),
      mesh = new Mesh(circleGeometry, lambertMaterial);

  mesh.receiveShadow = true;

  scene.add(mesh);

}

// #shape
function initShape(){

  let shape = new Shape(),
      p = new Shape(),
      l1 = new Shape(),
      l2 = new Shape(),
      material = new LIB.MeshBasicMaterial({ color: 0x00ff00,  }),
      shapeGeometry, mesh;

  // shape.arc(0, 0, 4, 0 * Math.PI / 180, 60 * Math.PI / 180);
  // shape.lineTo(0, 0);

  // shape.ellipse(0, 0, 2, 4, 270 * Math.PI / 180, 90 * Math.PI / 180);

  // shape.quadraticCurveTo(4, 2, 4, 0);

  // l1.moveTo(-1, -2);
  // l1.lineTo(-2, 0);
  // l1.lineTo(-3, 2);

  // l2.moveTo(-4, -8);
  // l2.lineTo(-2, -4);
  // l2.lineTo(0, 4);

  p.moveTo(-4, -8);
  p.bezierCurveTo(-2, -4, -1, -2, -2, 0);
  p.bezierCurveTo(-3, 2, -5, 8, 2, 4);

  // shapeGeometry = new LIB.ExtrudeGeometry(p, extrudeSettings);
  shapeGeometry = new LIB.ShapeGeometry(p);
  // l1Geometry = new LIB.ShapeGeometry(l1);
  // l2Geometry = new LIB.ShapeGeometry(l2);

  road = new LIB.Line(shapeGeometry, material);
  mesh = new LIB.Mesh(shapeGeometry, material);
  
  // scene.add(new Line(l1Geometry, material));
  // scene.add(new Line(l2Geometry, material));
  scene.add(road);

}

// # extrude

// # parametric
function initParametic(){ 
  
  let geometry, mesh,
      material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  
  geometry = new LIB.ParametricGeometry(algorithm, 3, 3);

  mesh = new Mesh(geometry, material);

  scene.add(mesh);

}

function algorithm(u, v){ 
  
  let radiu = 4;

  return new LIB.Vector3(u, v, 0);

}

// #Point
function initPoint(){
  let geometry = new THREE.Geometry(),
      material = new THREE.PointsMaterial({ color: '#0f0', size: 1 });

  geometry.vertices = [new THREE.Vector3(1, 1, 1)];

  return new THREE.Points(geometry, material);
}

// #Line
function initLine(aVertice, color){

  let geometry = new THREE.Geometry(), 
      material = new THREE.LineBasicMaterial({ color }), 
      line = new THREE.Line(geometry, material);

  aVertice.forEach(v => geometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2])));

  return line;

}

function rotateX(bufferAttribute){ 
  let modeMatrix = new Matrix4();

  // console.error(modeMatrix.elements, bufferAttribute.array);

  modeMatrix.makeRotationX(90 * Math.PI / 180);
  modeMatrix.applyToBufferAttribute(bufferAttribute);

  // console.error(modeMatrix.elements, bufferAttribute.array);

}

// #Light
// spot
function initSpotLight(){
  
  let spotLight = new LIB.SpotLight(0xff0000);

  spotLight.position.set(0, 0, 5);
  spotLight.castShadow = true;
  
  scene.add(spotLight);

}

// 
function initFont(){
  let url = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      // opt
      opt = {
        size: 1,
        height: 1,
      },
      loader = new THREE.FontLoader();
  
  loader.load(url, function(font){
    console.error(font);
    opt.font = font;
    let textGeometry = new THREE.TextGeometry('x轴', opt);

    let material = new THREE.MeshBasicMaterial({ color: '#000' });

    let mesh = new THREE.Mesh(textGeometry, material);

    scene.add(mesh);
  });
}

/**
 * 
 * helper
 * 
 */
function initBoxHelper(mesh, color){

  let helper = new LIB.BoxHelper(mesh, color);

  scene.add(helper);

}

/**
 * 
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------
 *  doc
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * Three.js相关文章 http://www.yanhuangxueyuan.com/Three.js_course.html
 * 
 */