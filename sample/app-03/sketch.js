// let myP5MovRec;

// Color picking
const colsURL = 'https://coolors.co/palette/ef476f-ffd166-06d6a0-118ab2';
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
  textAlign(CENTER, CENTER);
  textSize(30);
  textFont('Kiwi Maru');
  strokeCap(ROUND);
  strokeWeight(5);

  // Set camera
  const angularVelocity = PI / 4;
  bmw.setCameraParam(0, angularVelocity, 0);

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();
}

function draw() {
  background(colors[0]);

  const walkerHeight = 500;
  drawWalkerLines(W / 2, W / 2, walkerHeight);
  drawWalkerMarkers(W / 2, W / 2, walkerHeight);

  // Draw texture
  image(textureGfx, 0, 0);
}

const drawWalkerLines = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
  push();
  {
    stroke(colors[1]);
    const lineMarkers = bmw.getLineMarkers(walkerHeight, tmsec);

    // Draw lines
    lineMarkers.forEach((m) => {
      const ratio = 0.25; // Omit quater length from both edge => Half length line
      const orgPos0 = m[0];
      const orgPos1 = m[1];

      const pos0 = createVector(
        ratio * orgPos0.x + (1 - ratio) * orgPos1.x + offsetX,
        ratio * orgPos0.y + (1 - ratio) * orgPos1.y + offsetY
      );

      const pos1 = createVector(
        (1 - ratio) * orgPos0.x + ratio * orgPos1.x + offsetX,
        (1 - ratio) * orgPos0.y + ratio * orgPos1.y + offsetY
      );

      line(pos0.x, pos0.y, pos1.x, pos1.y);
    });
  }
  pop();
};

const drawWalkerMarkers = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
  const markers = bmw.getMarkers(walkerHeight, tmsec);

  const descTable = [
    { desc: 'Head', char: '頭' },
    { desc: 'Clavicles', char: '胸' },
    { desc: 'L-Shoulder', char: '肩' },
    { desc: 'L-Elbow', char: '肘' },
    { desc: 'L-Hand', char: '手' },
    { desc: 'R-Shoulder', char: '肩' },
    { desc: 'R-Elbow', char: '肘' },
    { desc: 'R-Hand', char: '手' },
    { desc: 'Belly', char: '腹' },
    { desc: 'L-Hip', char: '尻' },
    { desc: 'L-Knee', char: '膝' },
    { desc: 'L-Ankle', char: '踝' },
    { desc: 'R-Hip', char: '尻' },
    { desc: 'R-Knee', char: '膝' },
    { desc: 'R-Ankle', char: '踝' },
  ];

  // Draw markers
  markers.forEach((m) => {
    descTable.forEach((e) => {
      if (e.desc === m.desc) {
        text(e.char, m.x + offsetX, m.y + offsetY);
      }
    });
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
