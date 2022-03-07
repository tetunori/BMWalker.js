
function keyTyped() {
  if (key === 's') {
    saveImage();
  }
}

// Save generated image
const saveImage = () => {
  const name = getYYYYMMDD_hhmmss(true) + '.png';
  saveCanvas(name, 'png');
};

// get Timestamp string
const getYYYYMMDD_hhmmss = (isNeedUS) => {
  const now = new Date();
  let retVal = '';

  // YYMMDD
  retVal += now.getFullYear();
  retVal += padZero2Digit(now.getMonth() + 1);
  retVal += padZero2Digit(now.getDate());

  if (isNeedUS) {
    retVal += '_';
  }

  // hhmmss
  retVal += padZero2Digit(now.getHours());
  retVal += padZero2Digit(now.getMinutes());
  retVal += padZero2Digit(now.getSeconds());

  return retVal;
};

// padding function
const padZero2Digit = (num) => {
  return (num < 10 ? '0' : '') + num;
};
