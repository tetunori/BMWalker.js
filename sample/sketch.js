const W = 720;

let bmw;

function setup() {
  createCanvas(W, W);
  bmw = new BMWalker(BMWalker.typeHuman);
}

function draw() {
  background(220);

  const markers = bmw.getMarkers(200);

  beginShape();
  {
    markers.forEach((m) => vertex(m.x, m.y));
  }
  endShape(CLOSE);

  // noLoop();
}
