// Inspired by the book '差分'
// https://bijutsu.press/books/2508/

let myP5MovRec;

// Color picking
const colsURL = 'https://coolors.co/palette/006400-006400-ffffff';
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
const numWalkers = 13;
const markerSize = 6;

// Biological motion walker instance
const bmw = new BMWalker();

let markerSettings = [];
let dotGfx;

function setup() {
  createCanvas(W, W);
  stroke(colors[2]);
  fill(colors[1]);

  dotGfx = createGraphics(W, W);
  dotGfx.stroke(colors[2]);
  dotGfx.fill(colors[1]);

  prepareWalkers();

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();
}

const prepareWalkers = () => {
  for (let i = 0; i < numWalkers; i++) {
    // Camera Settings
    const azAbs = PI / 16;
    const azimuth = PI / 4 + random(-azAbs, azAbs);
    const elevation = PI / 4;
    bmw.setCameraParam(azimuth, 0, elevation, 0);

    // Walker Settings
    const walkerHeight = random(150, 350);
    const tmsec = random(1000);
    const markers = bmw.getMarkers(walkerHeight, tmsec);
    const drawWalkerLines = bmw.getLineMarkers(walkerHeight, tmsec);

    const x = (i * W) / numWalkers + random(40);
    const y = (i * W) / numWalkers + random(40);
    const markerSetting = {
      x: x,
      y: y,
      walkerHeight: walkerHeight,
      azimuth: azimuth,
      elevation: elevation,
      markers: markers,
      drawWalkerLines: drawWalkerLines,
      tmsec: tmsec,
    };
    markerSettings.push(markerSetting);

    // Prepare dot graphics
    markers.forEach((m) => {
      dotGfx.circle(m.x + x, m.y + y, markerSize);
    });
  }
};

function draw() {
  background(colors[0]);

  // Draw dot graphics first.
  image(dotGfx, 0, 0, W, W);
  const fc = (frameCount % 320) / 10 - 5;

  // Draw walkers
  markerSettings.forEach((t, i) => {
    if (i < fc && i > fc - 15) {
      bmw.setCameraParam(t.azimuth, 0, t.elevation, 0);
      drawWalkerLines(t.x, t.y, t.walkerHeight, t.tmsec);
      drawWalkerMarkers(t.x, t.y, t.walkerHeight, t.tmsec);
    }
  });

  // Draw texture
  image(textureGfx, 0, 0);
}

const drawWalkerLines = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
  const lineMarkers = bmw.getLineMarkers(walkerHeight, tmsec);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x + offsetX, m[0].y + offsetY, m[1].x + offsetX, m[1].y + offsetY);
  });
};

const drawWalkerMarkers = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
  const markers = bmw.getMarkers(walkerHeight, tmsec);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x + offsetX, m.y + offsetY, markerSize);
  });
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
