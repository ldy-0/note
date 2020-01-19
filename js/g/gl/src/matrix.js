let matrix = {
  translate(x, y, z){
    let matrix = this.modeMatrix;
    if(!matrix) return console.warn('no modeMatrix');

    if(x && x.map) [x, y, z] = [x[0], x[1], x[2]];

    if(x != null) matrix[12] = x;
    if(y != null) matrix[13] = y;
    if(z != null) matrix[14] = z;

    return this;
  },

  scale(x, y, z){
    let matrix = this.modeMatrix;
    if(!matrix) return console.warn('no modeMatrix');

    if(x != null) matrix[0] *= x;
    if(y != null) matrix[5] *= y;
    if(z != null) matrix[10] *= z;

    return this;
  },

  rotateX(deg){
    let matrix = this.modeMatrix;
    if(!matrix) return console.warn('no modeMatrix');

    let r = deg * Math.PI / 180,
        c = Math.cos(r),
        s = Math.sin(r);
    matrix[5] = c * (matrix[5] || 1);
    matrix[6] = s * (matrix[6] || 1);
    matrix[9] = -s * (matrix[9] || 1);
    matrix[10] = c * (matrix[10] || 1);

    return this;
  },
  rotateY(deg){
    let matrix = this.modeMatrix;
    if(!matrix) return console.warn('no modeMatrix');

    let r = deg * Math.PI / 180,
        c = Math.cos(r),
        s = Math.sin(r);
    matrix[0] = c * (matrix[0] || 1);
    matrix[2] = -s * (matrix[2] || 1);
    matrix[8] = s * (matrix[8] || 1);
    matrix[10] = c * (matrix[10] || 1);

    return this;
  },
  rotateZ(deg){
    let matrix = this.modeMatrix;
    if(!matrix) return console.warn('no modeMatrix');

    let r = deg * Math.PI / 180,
        c = Math.cos(r),
        s = Math.sin(r);
    matrix[0] = c * (matrix[0] || 1);
    matrix[1] = s * (matrix[1] || 1);
    matrix[4] = -s * (matrix[4] || 1);
    matrix[5] = c * (matrix[5] || 1);

    return this;
  },

  getInverse3: function(me) {
    let te = [];
    var n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ],
        n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ],
        n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ],

        t11 = n33 * n22 - n32 * n23,
        t12 = n32 * n13 - n33 * n12,
        t13 = n23 * n12 - n22 * n13,

        det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) return [];

		var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
    te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;
    
    return te;
  },

  getInverse4: function (me) {
    let te = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    let n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
        n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
        n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
        n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    
        var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if ( det === 0 ) return ;

        var detInv = 1 / det;

        te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

    return te;
  },
  
  transpose(m) {
    let len = m.length / 4 === 4 ? 4 : 3,
        offset = 0;

    for(let i = 0; i < len; i++){

      for(let j = i + 1; j < len; j++){
        let o = i * len + j,
            n = j * len + i;

        [m[o], m[n]] = [m[n], m[o]];
      }

    }

    return m;
  },

  identity(){
    return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,];
  }
};

/**
 * 
 * 旋转公式推导: https://www.cnblogs.com/wonderKK/p/5275003.html
 * 三维旋转矩阵推导 https://www.pianshen.com/article/2836477750/
 * 
 * 伴随矩阵求逆 https://www.cnblogs.com/zCoderJoy/p/3999118.html
 * LU三角分解求逆: https://blog.csdn.net/lvxiangyu11/article/details/82317964?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
 * 矩阵求逆 https://www.zhihu.com/question/19584577/answer/942314397
 */

/***************************************************************************************************************************************************/
function getOrtho(left, right, bottom, top, near, far){
  let x = right - left,
      y = top - bottom,
      z = far - near;
      
  return [
    2/x, 0, 0, 0,
    0, 2/y, 0, 0,
    0, 0, 2/z, 0,
    -(left + right)/x, -(top + bottom)/y, -(far + near)/z, 1,
  ];
}

function getPerspect(deg, radio, near, far) {
  let r = deg / 2 * Math.PI / 180,
      t = Math.tan(r),
      z = far - near;

  return [
    1 / (t * radio), 0, 0, 0,
    0, 1 / t, 0, 0,
    0, 0, (near + far) / -z, -1,
    0, 0, 2 * near * far / -z, 0,
  ];
}