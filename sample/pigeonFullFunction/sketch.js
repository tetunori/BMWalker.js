const W = 720;

// Biological motion walker instance
const bmw = new BMWalker(BMW_TYPE_PIGEON);

// dat GUI instance
const gui = new dat.GUI({ closeOnTop: true });

// Setting values for dat GUI
const walkerSettingsDefault = {
  walkerHeight: W / 3,
  speed: 1.0,
};
const walkerSettings = new Object();
const walkerFolder = gui.addFolder('Walker');

const cameraSettingsDefault = {
  azimuth: 0.0,
  angularVelocity: 0.0,
  elevation: 0.0,
  roll: 0.0,
};
const cameraSettings = new Object();
const cameraFolder = gui.addFolder('Camera');

const translationSettingsDefault = {
  flagTranslation: false,
};
const translationSettings = new Object();
const translationFolder = gui.addFolder('Translation');

const canvasSettingsDefault = {
  dot: true,
  dotSize: 6,
  description: false,
  line: false,
  invert: false,
};
const canvasSettings = new Object();
const canvasFolder = gui.addFolder('Canvas');

const utilities = {
  reset: () => {
    initializeSettings();
  },
};

const prepareDatGUI = () => {
  // Set initial values
  initializeSettings();

  // Add some settings
  const step = 0.1;

  //  -- Walker
  walkerFolder.add(walkerSettings, 'walkerHeight', 1, W);
  walkerFolder.add(walkerSettings, 'speed', bmw.minSpeed, bmw.maxSpeed, step);
  walkerFolder.open();

  //  -- Camera
  cameraFolder.add(cameraSettings, 'azimuth', -PI, PI, step);
  cameraFolder.add(cameraSettings, 'angularVelocity', -TAU, TAU, step);
  cameraFolder.add(cameraSettings, 'elevation', -PI, PI, step);
  cameraFolder.add(cameraSettings, 'roll', -PI, PI, step);
  cameraFolder.open();

  //  -- Translation
  translationFolder.add(translationSettings, 'flagTranslation').onFinishChange(() => {
    if (translationSettings.flagTranslation) {
      bmw.resetTimer();
    }
  });
  translationFolder.open();

  //  -- Canvas
  canvasFolder.add(canvasSettings, 'dot');
  canvasFolder.add(canvasSettings, 'dotSize', 0, 30, 1);
  canvasFolder.add(canvasSettings, 'description');
  canvasFolder.add(canvasSettings, 'line');
  canvasFolder.add(canvasSettings, 'invert');
  canvasFolder.open();

  //  -- Utilities
  gui.add(utilities, 'reset');
};

// Initialize with default values
const initializeSettings = () => {
  walkerSettings.walkerHeight = walkerSettingsDefault.walkerHeight;
  walkerSettings.speed = walkerSettingsDefault.speed;
  cameraSettings.azimuth = cameraSettingsDefault.azimuth;
  cameraSettings.angularVelocity = cameraSettingsDefault.angularVelocity;
  cameraSettings.elevation = cameraSettingsDefault.elevation;
  cameraSettings.roll = cameraSettingsDefault.roll;
  translationSettings.flagTranslation = translationSettingsDefault.flagTranslation;
  canvasSettings.dot = canvasSettingsDefault.dot;
  canvasSettings.description = canvasSettingsDefault.description;
  canvasSettings.dotSize = canvasSettingsDefault.dotSize;
  canvasSettings.line = canvasSettingsDefault.line;
  canvasSettings.invert = canvasSettingsDefault.invert;
  gui.updateDisplay();
};

// p5.js Sketch
function setup() {
  // On p5.js canvas
  createCanvas(W, W);
  textAlign(CENTER, CENTER);

  // Prepare GUI
  prepareDatGUI();
}

function draw() {
  // Set speed
  bmw.setSpeed(walkerSettings.speed);

  // Set Camera params
  bmw.setCameraParam(
    cameraSettings.azimuth,
    cameraSettings.angularVelocity,
    cameraSettings.elevation,
    cameraSettings.roll
  );

  // Set Translation params
  bmw.setTranslationParam(translationSettings.flagTranslation);

  // Drawing Part
  const markers = bmw.getMarkers(walkerSettings.walkerHeight);
  translate(W / 2, W / 2);

  // Choose colors
  let bgColor = 220;
  let lineColor = 30;
  if (canvasSettings.invert) {
    bgColor = 30;
    lineColor = 255;
  }
  background(bgColor);
  stroke(lineColor);

  // Draw lines first
  if (canvasSettings.line) {
    const lineMarkers = bmw.getLineMarkers(walkerSettings.walkerHeight);
    lineMarkers.forEach((m) => {
      line(m[0].x, m[0].y, m[1].x, m[1].y);
    });
  }

  // Draw dots next.
  if (canvasSettings.dot) {
    markers.forEach((m, i) => {
      circle(m.x, m.y, canvasSettings.dotSize);
      // text(i, m.x, m.y);
    });
  }

  // Draw descriptions of each dots.
  if (canvasSettings.description) {
    push();
    {
      noStroke();
      fill(lineColor);
      markers.forEach((m) => {
        text(m.desc, m.x, m.y + 20);
      });
    }
    pop();
  }

  // Show center for debug
  const showCenter = false;
  if (showCenter) {
    push();
    {
      fill('red');
      circle(0, 0, 10);
    }
    pop();
  }
}
