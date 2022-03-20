const W = 360;

// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);
  textSize(15);
  textAlign(CENTER, CENTER);

  // Set camera status with mouseX/Y coordinate.
  let azimuth, elevation;
  if (mouseIsPressed) {
    azimuth = map(mouseX, 0, width, -PI, PI);
    elevation = map(mouseY, 0, height, -PI, PI);
  } else {
    azimuth = PI / 4;
    elevation = PI / 4;
  }
  bmw.setCameraParam(azimuth, 0, elevation);

  // Show text.
  text(
    'azimuth: ' + azimuth.toFixed(2) + ', ' + 'elevation: ' + elevation.toFixed(2),
    0,
    W / 2 - 40
  );
  if (!mouseIsPressed) {
    text('Click and move to adjust.', 0, W / 2 - 20);
  }

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
