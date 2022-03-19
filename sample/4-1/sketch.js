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
  textSize(15);

  // Set speed with mouseX coordinate.
  let xVal, yVal;
  let xDesc, yDesc;
  if (!mouseIsPressed) {
    xVal = map(mouseX, 0, width, bmw.minBodyStructure, bmw.maxBodyStructure);
    yVal = map(mouseY, 0, height, bmw.minHappiness, bmw.maxHappiness);
    xDesc = 'bodyStructure: ';
    yDesc = 'happiness: ';
    bmw.setWalkerParam(xVal, 0, 0, yVal);
  } else {
    xVal = map(mouseX, 0, width, bmw.minWeight, bmw.maxWeight);
    yVal = map(mouseY, 0, height, bmw.minNervousness, bmw.maxNervousness);
    xDesc = 'weight: ';
    yDesc = 'nervousness: ';
    bmw.setWalkerParam(0, xVal, yVal, 0);
  }

  // Get array of the current marker coordinates
  const walkerHeight = 200;
  const markers = bmw.getMarkers(walkerHeight);

  // Draw markers
  markers.forEach((m) => {
    circle(m.x, m.y, 6);
  });

  // Show text of setSpeed argument.
  text(xDesc + xVal.toFixed(2) + ', ' + yDesc + yVal.toFixed(2), 0, W / 2 - 40);
}
