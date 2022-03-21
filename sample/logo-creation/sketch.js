// Create Biological motion walker instance
const bmw = new BMWalker();

let logoGfx;
let maskGfx;

function setup() {
  createCanvas(1280, 640);
  // pixelDensity(1)
  logoGfx = createGraphics(width, height);
  maskGfx = createGraphics(width, height);
    fill(255);
  stroke(0);
  logoGfx.fill(0);
  logoGfx.stroke(255);
  prepareLogo();
}

function draw() {
  background(220);
  logoGfx.background(0);

  drawWalkers();

  const logoGfxPict = logoGfx.get();
  logoGfxPict.mask(maskGfx);
  image(logoGfxPict, 0, 0);
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
        logoGfx.line(m[0].x + intervalX, m[0].y + offsetY, m[1].x + intervalX, m[1].y + offsetY);
      });

      const markers = bmw.getMarkers(walkerHeight, i * intervalTime + 20 * frameCount);
      // console.log(markers);

      // Draw markers
      markers.forEach((m) => {
        circle(m.x + intervalX, m.y + offsetY, 6);
        logoGfx.circle(m.x + intervalX, m.y + offsetY, 6);
      });
    }
  }
};

const prepareLogo = () => {
  maskGfx.textFont('Noto Sans JP');
  maskGfx.textAlign(CENTER, CENTER);
  maskGfx.translate(0, height / 2);

  const textOffsetY = 60;
  maskGfx.textSize(120);
  maskGfx.text('BMWalker.js', width / 2, -textOffsetY);
  maskGfx.textSize(35);
  maskGfx.text(
    "A simple JavaScript library for biological motion 'Walker'",
    width / 2,
    textOffsetY
  );
};
