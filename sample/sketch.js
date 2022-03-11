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
  translate(200, 200);
  markers.forEach((m,i) => {
    circle(m.x, m.y, 10);

    textAlign(CENTER, CENTER)
    // text(i, m.x, m.y);
    text(m.desc, m.x, m.y + 20);

    // console.log(m.desc);
  });

  // beginShape();
  // {
  //   markers.forEach((m) => vertex(m.x, m.y));
  // }
  // endShape(CLOSE);
  // noLoop();
}
