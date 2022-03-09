class BMWalker {
  static typeHuman = 0;
  static typeCat = 1;
  static typePigeon = 2;
  static typeBox = 3;

  // Constructor
  constructor(type = BMWalker.typeHuman) {
    this.type = type;

    this.tm = new BMWTimer();
    this.starttime = this.tm.getTimer();

    this.mtrx = new BMWMatrix();

    this.speed = 1.0;

    // Parameters
    this.bs = 0;
    this.weight = 0;
    this.nrvs = 0;
    this.hp = 0;
  }

  // API: Get markers
  getMarkers(wh, tmsec = undefined) {
    let markers = [];

    if (tmsec === undefined) {
      tmsec = this.tm.getTimer();
    }
    // console.log(tmsec);

    // get markers
    markers = [
      { x: 0, y: 0, desc: '1' },
      { x: 0, y: wh, desc: '2' },
      { x: wh / 2, y: wh, desc: '3' },
      { x: wh / 2, y: 0, desc: '4' },
    ];

    return markers;
  }

  // API: Set speed
  setSpeed( speed ){
    const maxSpeed = 2.0;
    const minSpeed = -2.0;
    const clampedSpeed = this.clamp(minSpeed, maxSpeed, speed);
    this.speed = clampedSpeed;
  }

  // API: ...
  setWalkerParam( bs = 0 , weight = 0, nrvs = 0, hp = 0 ){

    // Body Structure Parameter
    const maxBS = 6.0;  // Big body
    const minBS = -6.0; // Small body
    const clampedBS = this.clamp(minBS, maxBS, bs);
    this.bs = clampedBS;

    // Weight Parameter
    const maxWeight = 6.0;  // Heavy
    const minWeight = -6.0; // Light
    const clampedWeight = this.clamp(minWeight, maxWeight, weight);
    this.weight = clampedWeight;

    // Nervousness Parameter
    const maxNrvs = 6.0;  // Nervous
    const minNrvs = -6.0; // Relaxed
    const clampedNrvs = this.clamp(minNrvs, maxNrvs, nrvs);
    this.nrvs = clampedNrvs;

    // Happiness Parameter
    const maxHp = 6.0;  // Happy
    const minHp = -6.0; // Sad
    const clampedHp = this.clamp(minHp, maxHp, hp);
    this.hp = clampedHp;

  }

  // API: ...
  setCameraParam( azimuth = 0 , angularVelocity = 0, elevation = 0 ){

    // Camera azimuth(rotation) Parameter
    this.azimuth = azimuth;

    // Camera angular velocity(rotation speed) Parameter
    this.angularVelocity = angularVelocity;

    // Camera elevation Parameter
    this.elevation = elevation;

  }

  // API: ...
  setTranslationParam( en = false ){
    this.isTranslationEnabled = en;
  }

  // Interval
  clamp( min, max, val){
    return Math.min(max, Math.max(min, val));
  }



}

// Simple Time class
class BMWTimer {
  // Constructor
  constructor() {
    const d = new Date().valueOf();
    this.time = d;
    this.start = d;

    const precision = 10; // 10msec
    setInterval(
      function () {
        this.time += precision;
      }.bind(this),
      precision
    );
  }

  getTimer() {
    return this.time - this.start;
  }
}

//// Matrix calculation
class BMWMatrix {
  constructor() {}

  newMatrix() {
    const m = [new Array(4), new Array(4), new Array(4), new Array(4)];
    return m;
  }

  // Identity matrix
  newIdentMatrix() {
    const m = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    return m;
  }

  rotateY(angle) {
    const m = [
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    return m;
  }

  rotateX(angle) {
    const m = [
      [1, 0, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle), 0],
      [0, Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    return m;
  }

  rotateZ(angle) {
    const m = [
      [Math.cos(angle), Math.sin(angle), 0, 0],
      [-Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    return m;
  }

  perspective(zfar) {
    const znear = 1;
    const f = zfar;
    const m = [
      [(zfar + znear) / (znear - zfar), (2 * zfar * znear) / (znear - zfar), 0, 0],
      [0, f, 0, 0],
      [0, 0, f, 0],
      [-1, 0, 0, 0],
    ];
    return m;
  }

  translate(tx, ty, tz) {
    const m = [
      [1, 0, 0, tx],
      [0, 1, 0, ty],
      [0, 0, 1, tz],
      [0, 0, 0, 1],
    ];
    return m;
  }

  rotateaxis(angle, rx, ry, rz) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const len = Math.sqrt(rx * rx + ry * ry + rz * rz);
    rx = rx / len;
    ry = ry / len;
    rz = rz / len;
    const m = [
      [rx * rx * (1 - c) + c, rx * ry * (1 - c) - rz * s, rx * rz * (1 - c) + ry * s, 0],
      [ry * rx * (1 - c) + rz * s, ry * ry * (1 - c) + c, ry * rz * (1 - c) - rx * s, 0],
      [rz * rx * (1 - c) - ry * s, rz * ry * (1 - c) + rx * s, rz * rz * (1 - c) + c, 0],
      [0, 0, 0, 1],
    ];
    return m;
  }

  multmatrix(m1, m2) {
    const m3 = newMatrix();
    let r = 0;
    let c = 0;

    for (r = 0; r < 4; r++) {
      for (c = 0; c < 4; c++) {
        m3[r][c] = 0;
      }
    }

    for (r = 0; r < 4; r++) {
      for (c = 0; c < 4; c++) {
        for (let i = 0; i < 4; i++) {
          m3[r][c] += m1[r][i] * m2[i][c];
        }
      }
    }
    return m3;
  }

  multmatrixvector(m, v) {
    const v2 = new Array(4);

    for (let i = 0; i < 4; i++) {
      v2[i] = 0;
    }

    for (let r = 0; r < 4; r++) {
      for (i = 0; i < 4; i++) {
        v2[r] += m[r][i] * v[i];
      }
    }
    return v2;
  }

  multvectormatrix(v, m) {
    const v2 = new Array(4);

    for (let i = 0; i < 4; i++) {
      v2[i] = 0;
    }

    for (let r = 0; r < 4; r++) {
      for (i = 0; i < 4; i++) {
        v2[r] += m[i][r] * v[i];
      }
    }
    return v2;
  }

  dotProd(x1, y1, z1, x2, y2, z2) {
    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  angleBetween(x1, y1, z1, x2, y2, z2) {
    const axislen1 = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
    // x1 = x1/axislen1;
    // y1 = y1/axislen1;
    // z1 = z1/axislen1;

    const axislen2 = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2);
    // x2 = x2/axislen2;
    // y2 = y2/axislen2;
    // z2 = z2/axislen2;

    const angle = Math.acos(dotProd(x1, y1, z1, x2, y2, z2) / (axislen1 * axislen2));
    //console.log(angle)

    if (Math.abs(angle) < 0.0001) return [0, 0, 1, 0];
    if (angle > 180) {
      angle = -(360 - angle);
    }

    //cross product
    const x3 = y1 * z2 - z1 * y2;
    const y3 = z1 * x2 - x1 * z2;
    const z3 = x1 * y2 - y1 * x2;

    return [x3, y3, z3, angle];
  }
}
