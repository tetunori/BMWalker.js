
class MyGamepad {
  constructor(parent = window) {
    this.parent = parent;
    window.addEventListener('gamepadconnected', (event) => {
      this.gamepadIndex = event.gamepad.index;
    });
  }

  setColors(bgC, refLineC, statusLineC) {
    this.bgC = bgC;
    this.refLineC = refLineC;
    this.statusLineC = statusLineC;
  }

  drawStatus(centerX, centerY, size) {
    strokeWeight(1.5);
    this.drawReferenceLines(centerX, centerY, size);
    this.drawInputStatus(centerX, centerY, size);
  }

  drawReferenceLines(centerX, centerY, size) {
    push();
    {
      fill(this.bgC);

      // Outline square
      const sqSize = size * 1.3;
      square(centerX - sqSize / 2, centerY - sqSize / 2, sqSize);

      // Outline circle
      stroke(this.refLineC);
      circle(centerX, centerY, size);

      // N-division lines
      const numLines = 8;
      for (let i = 0; i < numLines; i++) {
        const v = p5.Vector.fromAngle((i * TAU) / numLines);
        v.mult(size / 2);
        v.add(createVector(centerX, centerY));
        line(centerX, centerY, v.x, v.y);
      }
    }

    pop();
  }

  drawInputStatus(centerX, centerY, size) {
    push();
    {
      fill(this.statusLineC);
      stroke(this.statusLineC);

      const gpi = this.gamepadIndex;
      if (gpi !== undefined) {
        const gamePad = navigator.getGamepads()[gpi];

        const GAMEPAD_LEFT_AXIS_X = 0;
        const GAMEPAD_LEFT_AXIS_Y = 1;
        const leftAxisX = gamePad.axes[GAMEPAD_LEFT_AXIS_X];
        const leftAxisY = gamePad.axes[GAMEPAD_LEFT_AXIS_Y];

        const xPos = centerX + (leftAxisX * size) / 2;
        const yPos = centerY + (leftAxisY * size) / 2;
        line(xPos, yPos, centerX, centerY);
        circle(xPos, yPos, 6);
      } else {
        circle(centerX, centerY, 6);
      }
    }
    pop();
  }

  getAngle() {
    let angle = 0;

    const gpi = this.gamepadIndex;
    if (gpi !== undefined) {
      const gamePad = navigator.getGamepads()[gpi];

      const GAMEPAD_LEFT_AXIS_X = 0;
      const GAMEPAD_LEFT_AXIS_Y = 1;
      const leftAxisX = gamePad.axes[GAMEPAD_LEFT_AXIS_X];
      const leftAxisY = gamePad.axes[GAMEPAD_LEFT_AXIS_Y];
      const v = createVector(leftAxisX, leftAxisY);
      angle = v.heading();
      // console.log(angle);
    }

    return angle;
  }

  getMagnitude() {
    let mag = 0;

    const gpi = this.gamepadIndex;
    if (gpi !== undefined) {
      const gamePad = navigator.getGamepads()[gpi];

      const GAMEPAD_LEFT_AXIS_X = 0;
      const GAMEPAD_LEFT_AXIS_Y = 1;
      const leftAxisX = gamePad.axes[GAMEPAD_LEFT_AXIS_X];
      const leftAxisY = gamePad.axes[GAMEPAD_LEFT_AXIS_Y];
      const v = createVector(leftAxisX, leftAxisY);
      mag = min(1.0, v.mag());
      // console.log(mag);
    }

    return mag;
  }
}
