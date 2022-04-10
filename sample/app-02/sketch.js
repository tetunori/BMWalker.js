let myP5MovRec;

const W = 720;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
  noStroke();

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();
}

function draw() {
  background(30);

  const walkerHeight = 300;

  [
    { startX: W - W / 4, startY: W / 4 + W / 16, azimuth: -PI / 4 },
    { startX: W / 4,     startY: W / 4 + W / 16, azimuth: PI / 4 },
    { startX: W/2,     startY: W/4, azimuth: 0},
  ].forEach((v, j) => {
    const startX = v.startX;
    const startY = v.startY;

    // Set camera
    const azimuth = v.azimuth;
    const elevation = PI / 4;
    bmw.setCameraParam(azimuth, 0, elevation);

    const markers = bmw.getMarkers(walkerHeight);

    // Draw markers
    markers.forEach((m, i) => {
      let e;
      const baseCount = 350;
      const currentFC = (frameCount - i * 3) % (2 * baseCount) + j * 100 - 100;
      if (currentFC < baseCount) {
        e = easeInOutExpo(currentFC / baseCount);
      } else {
        e = 1 - easeInOutExpo((currentFC - baseCount) / baseCount);
      }
      const offsetX = map(e, 0, 1, startX, W - startX);
      const offsetY = map(e, 0, 1, startY, W - startY);

      circle(m.x + offsetX, m.y + offsetY, 10);
    });
  });
  
  // Draw texture
  image(textureGfx, 0, 0);
}

// Ease function
// https://easings.net/ja#easeInOutExpo
const easeInOutExpo = (x) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? pow(7, 20 * x - 10) / 2
    : (2 - pow(7, -20 * x + 10)) / 2;
};

function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      myP5MovRec.startRec();
      break;
    case 50: //2: set webm, stop
      // myP5MovRec.setMovType(P5MovRec.movTypeId.webm); // webm is default value
      myP5MovRec.stopRec();
      break;
    case 51: //3: set mp4, stop
      myP5MovRec.setMovType(P5MovRec.movTypeId.mp4); // for mp4 container
      myP5MovRec.stopRec();
      break;
    default:
      break;
  }
}
