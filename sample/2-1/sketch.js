const W = 360;

// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(W, W);
}

function draw() {
  background(220);
  translate(W / 2, W / 2);

  // Get array of the current line markers
  const walkerHeight = 300;
  const lineMarkers = bmw.getLineMarkers(walkerHeight);
  // console.log(lineMarkers);

  // Draw lines
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[1].x, m[1].y);
  });

}
