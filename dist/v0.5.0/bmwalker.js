class BMWalker {
  static typeHuman = 0;
  static typeCat = 1;
  static typePigeon = 2;
  static typeBox = 3;

  // Constructor
  constructor(type = BMWalker.typeHuman) {
    this.type = type;

    this.tm = new Timer();
    this.starttime = this.tm.getTimer();
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
      { x: 0, y: 0 },
      { x: 0, y: wh },
      { x: wh / 2, y: wh },
      { x: wh / 2, y: 0 },
    ];

    return markers;
  }
}

class Timer {
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
