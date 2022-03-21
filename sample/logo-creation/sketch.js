// Create Biological motion walker instance
const bmw = new BMWalker();

function setup() {
  createCanvas(1280, 640);
}

function draw() {
  background(220);
  drawWalkers();
  drawLogo();
}

const drawWalkers = () => {
  // Get array of the current marker coordinates
  const walkerHeight = height * 0.34;
  const intervalTime = 300;

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 16; i++) {
      const azimuth = (10 * PI) / 16 + (i * PI) / 16;
      const elevation = (PI / 4) * j - PI / 4;
      bmw.setCameraParam(azimuth, 0, elevation);
      const intervalX = i * 100 + 10;
      const offsetY = walkerHeight * j - walkerHeight + height / 2;

      // Draw lines
      const lineMarkers = bmw.getLineMarkers(walkerHeight, i * intervalTime + 20 * frameCount);
      lineMarkers.forEach((m) => {
        line(m[0].x + intervalX, m[0].y + offsetY, m[1].x + intervalX, m[1].y + offsetY);
      });

      const markers = bmw.getMarkers(walkerHeight, i * intervalTime + 20 * frameCount);
      // console.log(markers);

      // Draw markers
      markers.forEach((m) => {
        circle(m.x + intervalX, m.y + offsetY, 6);
      });
    }
  }
};

const drawLogo = () => {
  push()
  noStroke();

  textFont('Noto Sans JP');
  textAlign(CENTER, CENTER);
  translate(0, height / 2);

  const textOffsetY = 60;
  textSize(120);
  text('BMWalker.js', width / 2, -textOffsetY);
  textSize(35);
  text("A simple JavaScript library for biological motion 'Walker'", width / 2, textOffsetY);
  noErase();
  pop()
};
