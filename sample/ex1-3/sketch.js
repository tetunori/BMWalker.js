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

  const lineMarkers = bmw.getLineMarkers(walkerHeight);
  // console.log(lineMarkers);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[0].z, m[1].x, m[1].y, m[1].z );
  });

}
