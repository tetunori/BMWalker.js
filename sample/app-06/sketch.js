
// let myP5MovRec;

// Color picking
const colsURL = 'https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500';
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
let gp;

// walker offset x/y
let x = W / 2;
let y = W / 2;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
  fill(colors[2]);
  stroke(colors[2]);
  textAlign(LEFT, CENTER);
  textSize(20);

  gp = new MyGamepad();
  gp.setColors(colors[1], colors[0], colors[2]);

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();

}

function draw() {
  background(colors[3]);

  // Show gamepad status
  gp.drawStatus(W / 8, W / 8, W / 8);

  // Prepare params on walker
  let azimuth = 0;
  let spd = 0;
  if (gp.getMagnitude() > 0.1) {
    azimuth = -gp.getAngle() + PI / 2;
    spd = map(gp.getMagnitude(), 0, 1, 0, bmw.maxSpeed * 0.5);

    const v = p5.Vector.fromAngle(-azimuth + PI / 2);
    const ratio = 1.5;
    x += v.x * spd * ratio;
    y += v.y * spd * ratio;
  }

  const elevation = PI / 4;
  bmw.setCameraParam(azimuth, 0, elevation);
  bmw.setSpeed(spd);

  // Draw walker
  drawWalker();

  // Draw text
  push();
  noStroke();
  text('Operate with a gamepad or mouse.', 20, W-30);
  pop();

  // Draw texture
  image(textureGfx, 0, 0);
}

const drawWalker = () => {
  const walkerHeight = 140;

  // Draw markers
  const markers = bmw.getMarkers(walkerHeight);

  markers.forEach((m) => {
    circle(m.x + x, m.y + y, 6);
  });

  const lineMarkers = bmw.getLineMarkers(walkerHeight);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x + x, m[0].y + y, m[1].x + x, m[1].y + y);
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
