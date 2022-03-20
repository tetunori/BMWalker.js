
const W = 360;

// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);

  // Get array of the current marker coordinates 
  const walkerHeight = 100;
  const markers = bmw.getMarkers(walkerHeight);
  // console.log(markers);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });
}
