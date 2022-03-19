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
  textSize(20);

  // Set speed with mouseX coordinate.
  const spd = map(mouseX, 0, width, bmw.minSpeed, bmw.maxSpeed);
  bmw.setSpeed(spd);

  // Get array of the current marker coordinates 
  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });

  // Show text of setSpeed argument.
  text('setSpeed(' + spd.toFixed(2) + ')', 0, W/2 - 40 );
}
