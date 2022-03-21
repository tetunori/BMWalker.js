const W = 360;

// Create Biological motion walker instance
const bmw = new BMWalker();
let currentFlagTranslation = false;

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);
  textSize(15);
  textAlign(CENTER, CENTER);

  // Set camera status with mouseX/Y coordinate.
  const azimuth = PI / 4;
  const elevation = PI / 4;
  bmw.setCameraParam(azimuth, 0, elevation);

  // Whether enable/disable translation. 
  const flagTranslation = mouseIsPressed ? true : false;
  if( flagTranslation && !currentFlagTranslation ){
    // Reset when Disable -> Enable only
    bmw.resetTimer();
  }
  currentFlagTranslation = flagTranslation;

  // Set translation parameter and show text.
  bmw.setTranslationParam(flagTranslation);
  text('Click to enable. flagTranslation: ' + flagTranslation + '.', 0, W / 2 - 20);

  // Get array of the current line markers
  const walkerHeight = 200;
  const lineMarkers = bmw.getLineMarkers(walkerHeight);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[1].x, m[1].y);
  });

  // Get markers
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });
}
