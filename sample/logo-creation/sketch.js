
// let myP5MovRec;

// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(1280, 640);

  textFont('Noto Sans JP');
  textAlign(CENTER, CENTER);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();

}

function draw() {
  background(220);

  drawWalkers();
  drawLogo();
}

const drawWalkers = () => {
  // Get array of the current marker coordinates
  const walkerHeight = height * 0.34;
  const intervalTime = 300;
  const rowWalkers = 3;
  const columnWalkers = 13;

  for (let j = 0; j < rowWalkers; j++) {
    for (let i = 0; i < columnWalkers; i++) {
      if (!isWalkerDraw(i, j)) {
        continue;
      }
      const azimuth = ((10 + i) * PI) / 16;
      const elevation = (j - 1) * (PI / 4);
      bmw.setCameraParam(azimuth, 0, elevation);
      const intervalX = i * 100 + 40;
      const offsetY = walkerHeight * (j - 1) + height / 2;
      const specTime = i * intervalTime + 20 * frameCount;

      // Draw lines
      const lineMarkers = bmw.getLineMarkers(walkerHeight, specTime);
      lineMarkers.forEach((m) => {
        line(m[0].x + intervalX, m[0].y + offsetY, m[1].x + intervalX, m[1].y + offsetY);
      });

      const markers = bmw.getMarkers(walkerHeight, specTime);

      // Draw markers
      markers.forEach((m) => {
        circle(m.x + intervalX, m.y + offsetY, 6);
      });
    }
  }
};

const isWalkerDraw = (i, j) => {
  let retValue = false;
  if (frameCount < 120) {
    // center walker only
    if (i === 6 && j === 1) {
      retValue = true;
    }
  } else if (frameCount < 170) {
    // center 3 walkers only
    if (j === 1) {
      if (abs(i - 6) < 2) {
        retValue = true;
      }
    }
  } else if (frameCount < 220) {
    // center row walkers only
    if (j === 1) {
      retValue = true;
    }
  } else {
    // all of walkers
    retValue = true;
  }

  return retValue;
};

const drawLogo = () => {
  if (frameCount < 270) {
    return;
  }

  push();
  {
    noStroke();
    translate(0, height / 2);

    const textOffsetY = 60;
    textSize(120);
    text('BMWalker.js', width / 2, -textOffsetY);

    textSize(35);
    text("A simple JavaScript library for biological motion 'Walker'", width / 2, textOffsetY);
    noErase();
  }

  pop();
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
