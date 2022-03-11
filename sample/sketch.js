const W = 720;

let bmw;

function setup() {
  createCanvas(W, W);
  bmw = new BMWalker();
}

function draw() {
  background(220);

  const walkerHeight = 300;
  const markers = bmw.getMarkers(walkerHeight);

  // beginShape();
  // {
  //   markers.forEach((m) => vertex(m.x, m.y));
  // }
  // endShape(CLOSE);
  // noLoop();
}
