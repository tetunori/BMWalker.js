let textureGfx;
const prepareTexture = (w,h) => {
  textureGfx = createGraphics(w,h);
  textureGfx.noStroke();

  // white texture
  const textureColor = color(255);
  textureColor.setAlpha(30);
  textureGfx.fill(textureColor);
  for (let i = 0; i < 100000; i++) {
    textureGfx.circle(random(w), random(h), (noise(i) * w) / 360);
  }
};

// Call prepareTexture() in setup();

// Call image(textureGfx, 0, 0); in draw();
