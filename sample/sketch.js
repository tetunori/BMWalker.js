const W = 720;

let bmw;

let dgui;

const walkerSettingsDefault = {
  speed: 1.0,
  bodyStructure: 0.0,
  weight: 0.0,
  nervousness: 0.0,
  happiness: 0.0,
};
let walkerSettings = new Object();
let walkerFolder;

const cameraSettingsDefault = {
  azimuth: 0.0,
  angularVelocity: 0.0,
  elevation: 0.0,
};
let cameraSettings = new Object();
let cameraFolder;

const translationSettingsDefault = {
  flagTranslation: false,
};
let translationSettings = new Object();
let translationFolder;

const utilities = {
  reset: () => {
    initializeSettings();
  },
};

function setup() {
  createCanvas(W, W);
  bmw = new BMWalker();
  dgui = new dat.GUI({closeOnTop: true});
  walkerFolder = dgui.addFolder('Walker');
  cameraFolder = dgui.addFolder('Camera');
  translationFolder = dgui.addFolder('Translation');

  initializeSettings();
  const step = 0.1;
  walkerFolder.add(walkerSettings, 'speed', BMWalker.minSpeed, BMWalker.maxSpeed, step);
  walkerFolder.add(
    walkerSettings,
    'bodyStructure',
    BMWalker.minBodyStructure,
    BMWalker.maxBodyStructure,
    step
  );
  walkerFolder.add(walkerSettings, 'weight', BMWalker.minWeight, BMWalker.maxWeight, step);
  walkerFolder.add(
    walkerSettings,
    'nervousness',
    BMWalker.minNervousness,
    BMWalker.maxNervousness,
    step
  );
  walkerFolder.add(walkerSettings, 'happiness', BMWalker.minHappiness, BMWalker.maxHappiness, step);
  walkerFolder.open();

  cameraFolder.add(cameraSettings, 'azimuth', -PI, PI, step);
  cameraFolder.add(cameraSettings, 'angularVelocity', -TAU, TAU, step);
  cameraFolder.add(cameraSettings, 'elevation', -PI, PI, step);
  cameraFolder.open();

  translationFolder.add(translationSettings, 'flagTranslation').onFinishChange(function(){
    if(translationSettings.flagTranslation){
      bmw.resetTimer();
    }
  });
  translationFolder.open();


  dgui.add(utilities, 'reset');
}

const initializeSettings = () => {
  walkerSettings.speed = walkerSettingsDefault.speed;
  walkerSettings.bodyStructure = walkerSettingsDefault.bodyStructure;
  walkerSettings.weight = walkerSettingsDefault.weight;
  walkerSettings.nervousness = walkerSettingsDefault.nervousness;
  walkerSettings.happiness = walkerSettingsDefault.happiness;
  cameraSettings.azimuth = cameraSettingsDefault.azimuth;
  cameraSettings.angularVelocity = cameraSettingsDefault.angularVelocity;
  cameraSettings.elevation = cameraSettingsDefault.elevation;
  translationSettings.flagTranslation = translationSettingsDefault.flagTranslation;
  dgui.updateDisplay();
};

function draw() {
  background(220);

  // const spd = map(mouseX, 0, width, -2, 2 )
  // if(mouseIsPressed){
  bmw.setSpeed(walkerSettings.speed);
  // }

  bmw.setWalkerParam(
    walkerSettings.bodyStructure,
    walkerSettings.weight,
    walkerSettings.nervousness,
    walkerSettings.happiness
  );

  bmw.setCameraParam(
    cameraSettings.azimuth,
    cameraSettings.angularVelocity,
    cameraSettings.elevation,
  );

  bmw.setTranslationParam(
    translationSettings.flagTranslation,
  );

  const walkerHeight = 300;
  const markers = bmw.getMarkers(walkerHeight);
  translate(200, 200);

  // const idxsArray = bmw.getLineMarkerIndices();
  // idxsArray.forEach((idxs) => {
  //   const i0 = idxs[0];
  //   const i1 = idxs[1];

  //   line(markers[i0].x, markers[i0].y, markers[i1].x, markers[i1].y);
  // });

  const lineMarkers = bmw.getLineMarkers(walkerHeight);
  lineMarkers.forEach((m) => {
    line(m[0].x, m[0].y, m[1].x, m[1].y);
  });

  markers.forEach((m, i) => {
    circle(m.x, m.y, 6);

    textAlign(CENTER, CENTER);
    // text(i, m.x, m.y);
    text(m.desc, m.x, m.y + 20);

    // console.log(m.desc);
  });

  // beginShape();
  // {
  //   markers.forEach((m) => vertex(m.x, m.y));
  // }
  // endShape(CLOSE);
  // noLoop();
}
