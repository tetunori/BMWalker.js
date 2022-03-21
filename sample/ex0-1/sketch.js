
const W = 360;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);

  // Get current markers
  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });
}
