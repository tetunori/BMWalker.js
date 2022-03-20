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

  // Set angularVelocity with mouseX coordinate.
  let angularVelocity;
  if (mouseIsPressed) {
    angularVelocity = map(mouseX, 0, width, -PI, PI);
  } else {
    angularVelocity = PI / 4;
  }
  const elevation = PI/4;
  bmw.setCameraParam(0, angularVelocity, elevation);

  // Show text.
  text(
    'angularVelocity: ' + angularVelocity.toFixed(2) + ', elevation: ' +  elevation.toFixed(2)  + '.',
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
