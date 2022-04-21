const W = 360;

// Biological motion walker instance
const bmw = new BMWalker(BMW_TYPE_PIGEON);

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);

  // Set Camera parameters
  bmw.setCameraParam(PI / 4, 0, PI / 4);

  const walkerHeight = 200;

  // Get line markers
  const lineMarkers = bmw.getLineMarkers(walkerHeight);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[1].x, m[1].y);
  });

  // Get current markers
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });
}
