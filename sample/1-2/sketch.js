const W = 360;

// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);
  textAlign(CENTER, CENTER);

  // Get array of the marker coordinates with bigger size and specified time.
  const walkerHeight = 350;
  // const specifiedTime = 500;
  const specifiedTime = 100 + frameCount * 30;
  const markers = bmw.getMarkers(walkerHeight, specifiedTime);

  // Draw each markers with descriptions
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
    text(m.desc, m.x, m.y + 15);
  });
}
