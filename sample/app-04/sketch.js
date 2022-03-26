let myP5MovRec;

// Color picking
let colors = [];
[
  'https://coolors.co/palette/caf0f8-ade8f4-90e0ef-48cae4-00b4d8-0096c7-0077b6',
  'https://coolors.co/palette/d8f3dc-b7e4c7-95d5b2-74c69d-52b788-40916c-2d6a4f',
  'https://coolors.co/palette/ffedd8-f3d5b5-e7bc91-d4a276-bc8a5f-a47148-8b5e34',
  'https://coolors.co/palette/ffba08-faa307-f48c06-e85d04-dc2f02-d00000-9d0208',
].forEach((url) => {
  colors.push(createCols(url));
});

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

  noStroke();
  strokeJoin(ROUND);

  prepareTexture(width, height);

  // myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
  // myP5MovRec.startRec();
}

function draw() {
  background(30);

  [
    { offsetX: W / 4, bodyStructure: -6.0, col: colors[0] },
    { offsetX: (3 * W) / 4, bodyStructure: 6.0, col: colors[1] },
  ].forEach((e) => {
    bmw.setWalkerParam(e.bodyStructure, 0, 0, 0);

    // Set camera
    const azimuth = (PI / 16) * sin(frameCount / 100);
    bmw.setCameraParam(azimuth, 0, 0);

    const walkerHeight = 600;
    const markers = bmw.getMarkers(walkerHeight);

    const head = 0;
    const clavicles = 1;
    const lShoulder = 2;
    const lElbow = 3;
    const lHand = 4;
    const rShoulder = 5;
    const rElbow = 6;
    const rHand = 7;
    const belly = 8;
    const lHip = 9;
    const lKnee = 10;
    const lAnkle = 11;
    const rHip = 12;
    const rKnee = 13;
    const rAnkle = 14;

    [
      [head, rShoulder, clavicles],
      [head, lShoulder, clavicles],
      [rShoulder, clavicles, belly, rHand],
      [lShoulder, clavicles, belly, lHand],
      [belly, rHand, rAnkle],
      [belly, rAnkle, lAnkle],
      [belly, lHand, lAnkle],
    ].forEach((polygon, i) => {
      const col = e.col[i];
      stroke(col);
      fill(col);
      beginShape();
      {
        polygon.forEach((idx) => {
          const v = markers[idx];
          vertex(v.x + e.offsetX, v.y + W / 2);
        });
      }
      endShape(CLOSE);
    });

    // For debug
    // markers.forEach((m) => {
    // circle(m.x + e.offsetX, m.y + W / 2, 10);
    // });
  });

  // Draw texture
  image(textureGfx, 0, 0);

  if (frameCount % 300 === 0) {
    shuffle(colors, true);
  }
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
