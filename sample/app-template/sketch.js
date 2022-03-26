let myP5MovRec;

// Color picking
const colsURL = 'https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff';
let colors = createCols(colsURL);

// Take some Colors from coolors URL
function createCols(url) {
  let slaIndex = url.lastIndexOf('/');
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split('-');
  for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
  return colArr;
}

const W = 720;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
  shuffle(colors, true);

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();
}

function draw() {
  background(30);

  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x + W / 2, m.y + W / 2, 6);
  });

  // Draw texture
  image(textureGfx, 0, 0);
}

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
