const W = 720;

// let myP5MovRec;
let startTime;
let walkerParamMatrix = [];

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
  stroke(255);

  prepareTexture(width, height);

  initialize();

  // Set camera
  const azimuth = PI / 4;
  const elevation = PI / 4;
  bmw.setCameraParam(azimuth, 0, elevation);

  // Set translation enabled
  bmw.setTranslationParam(true);

  // myP5MovRec = new P5MovRec();
  // myP5MovRec.startRec();
}

const initialize = () => {
  bmw.resetTimer();
  startTime = Date.now();

  walkerParamMatrix = [];
  for (let i = 0; i < 13; i++) {
    walkerParamMatrix.push({ time: random(-1200, 1200), pos: -250 + i * 50 });
  }
};

function draw() {
  background(30);

  // Threshold lines
  [112, -107].forEach((v) => {
    push();
    line(v, W + v, W + v, v);
    pop();
  });

  const walkerHeight = 150;

  const dressedTiming = 2600;
  const undressedTiming = 5900;
  const currentTime = Date.now() - startTime;

  walkerParamMatrix.forEach((o) => {
    const offsetY = walkerHeight / 2;
    push();
    {
      translate(-o.pos, o.pos);
      const cT = currentTime + o.time;

      // Always, draw lines 
      drawWalkerLines(offsetY, walkerHeight, cT);

      // Draw markers
      if (cT < dressedTiming) {
        drawWalkerMarkers(offsetY, walkerHeight, dressedTiming);
      } else if (cT > undressedTiming) {
        drawWalkerMarkers(offsetY, walkerHeight, undressedTiming);
      } else {
        drawWalkerMarkers(offsetY, walkerHeight, cT);
      }
    }
    pop();
  });

  // Reset
  if (currentTime > 11000) {
    initialize();
  }

  // Draw texture
  image(textureGfx, 0, 0);
}

const drawWalkerLines = (offsetY, walkerHeight, tmsec = undefined) => {
  const lineMarkers = bmw.getLineMarkers(walkerHeight, tmsec);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y + offsetY, m[1].x, m[1].y + offsetY);
  });
};

const drawWalkerMarkers = (offsetY, walkerHeight, tmsec = undefined) => {
  const markers = bmw.getMarkers(walkerHeight, tmsec);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y + offsetY, 4);
  });
};

// function keyPressed() {
//   switch (keyCode) {
//     case 49: //1: Start record
//       myP5MovRec.startRec();
//       break;
//     case 50: //2: set webm, stop
//       // myP5MovRec.setMovType(P5MovRec.movTypeId.webm); // webm is default value
//       myP5MovRec.stopRec();
//       break;
//     case 51: //3: set mp4, stop
//       myP5MovRec.setMovType(P5MovRec.movTypeId.mp4); // for mp4 container
//       myP5MovRec.stopRec();
//       break;
//     default:
//       break;
//   }
// }
