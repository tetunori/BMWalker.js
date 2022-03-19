
const W = 720;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);

  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });
}
