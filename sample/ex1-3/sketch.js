const W = 360;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W, WEBGL);
  debugMode();
}

function draw() {
  background(220);
  orbitControl();

  // Get current markers
  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    push();
    {
      translate(m.x, m.y, m.z);
      sphere(2);
    }
    pop();
  });
}
