const W = 720;

let bmw;

function setup() {
  createCanvas(W, W);
  bmw = new BMWalker();
  
}

function draw() {
  background(220);

  const spd = map(mouseX, 0, width, -2, 2 )
  if(mouseIsPressed){
    bmw.setSpeed(spd)
  }

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
