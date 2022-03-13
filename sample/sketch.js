const W = 720;

// Biological motion walker instance
const bmw = new BMWalker();

// dat GUI instance
const gui = new dat.GUI({ closeOnTop: true });

// Setting values for dat GUI
const walkerSettingsDefault = {
  walkerHeight: W / 2,
  speed: 1.0,
  bodyStructure: 0.0,
  weight: 0.0,
  nervousness: 0.0,
  happiness: 0.0,
};
const walkerSettings = new Object();
const walkerFolder = gui.addFolder('Walker');

const cameraSettingsDefault = {
  azimuth: 0.0,
  angularVelocity: 0.0,
  elevation: 0.0,
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
  walkerBox: false,
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
  walkerFolder.add(
    walkerSettings,
    'bodyStructure',
    bmw.minBodyStructure,
    bmw.maxBodyStructure,
    step
  );
  walkerFolder.add(walkerSettings, 'weight', bmw.minWeight, bmw.maxWeight, step);
  walkerFolder.add(walkerSettings, 'nervousness', bmw.minNervousness, bmw.maxNervousness, step);
  walkerFolder.add(walkerSettings, 'happiness', bmw.minHappiness, bmw.maxHappiness, step);
  walkerFolder.open();

  //  -- Camera
  cameraFolder.add(cameraSettings, 'azimuth', -PI, PI, step);
  cameraFolder.add(cameraSettings, 'angularVelocity', -TAU, TAU, step);
  cameraFolder.add(cameraSettings, 'elevation', -PI, PI, step);
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
  canvasFolder.add(canvasSettings, 'walkerBox');
  canvasFolder.open();

  //  -- Utilities
  gui.add(utilities, 'reset');
};

// Initialize with default values
const initializeSettings = () => {
  walkerSettings.walkerHeight = walkerSettingsDefault.walkerHeight;
  walkerSettings.speed = walkerSettingsDefault.speed;
  walkerSettings.bodyStructure = walkerSettingsDefault.bodyStructure;
  walkerSettings.weight = walkerSettingsDefault.weight;
  walkerSettings.nervousness = walkerSettingsDefault.nervousness;
  walkerSettings.happiness = walkerSettingsDefault.happiness;
  cameraSettings.azimuth = cameraSettingsDefault.azimuth;
  cameraSettings.angularVelocity = cameraSettingsDefault.angularVelocity;
  cameraSettings.elevation = cameraSettingsDefault.elevation;
  translationSettings.flagTranslation = translationSettingsDefault.flagTranslation;
  canvasSettings.dot = canvasSettingsDefault.dot;
  canvasSettings.description = canvasSettingsDefault.description;
  canvasSettings.dotSize = canvasSettingsDefault.dotSize;
  canvasSettings.line = canvasSettingsDefault.line;
  canvasSettings.invert = canvasSettingsDefault.invert;
  canvasSettings.walkerBox = canvasSettingsDefault.walkerBox;
  gui.updateDisplay();
};

// p5.js Sketch
function setup() {
  // On p5.js canvas
  createCanvas(W, W);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Prepare GUI
  prepareDatGUI();
}

function draw() {
  // Set speed
  bmw.setSpeed(walkerSettings.speed);

  // Set Walker params
  bmw.setWalkerParam(
    walkerSettings.bodyStructure,
    walkerSettings.weight,
    walkerSettings.nervousness,
    walkerSettings.happiness
  );

  // Set Camera params
  bmw.setCameraParam(
    cameraSettings.azimuth,
    cameraSettings.angularVelocity,
    cameraSettings.elevation
  );

  // Set Translation params
  bmw.setTranslationParam(translationSettings.flagTranslation);

  // Drawing Part

  // Choose colors
  let bgColor = 220;
  let lineColor = 30;
  if (canvasSettings.invert) {
    bgColor = 30;
    lineColor = 255;
  }
  background(bgColor);
  stroke(lineColor);

  if (canvasSettings.walkerBox) {
    push();
    {
      fill('green');
      noStroke();
      rect(W / 2, W / 2, walkerSettings.walkerHeight / 2, walkerSettings.walkerHeight);
    }
    pop();
  }

  const markers = bmw.getMarkers(walkerSettings.walkerHeight);
  translate(W / 2, W / 2);

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
  if (canvasSettings.walkerBox) {
    push();
    {
      fill('red');
      circle(0, 0, 10);
    }
    pop();
  }
}
