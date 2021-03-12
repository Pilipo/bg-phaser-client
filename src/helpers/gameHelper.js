const convertIndexToPoint = (idx) => {
  let returnValue = { x: null, y: null };
  switch (idx) {
    case 0: {
      returnValue.x = 65;
      returnValue.y = 65;
      break;
    }
    case 1: {
      returnValue.x = 250;
      returnValue.y = 65;
      break;
    }
    case 2: {
      returnValue.x = 400;
      returnValue.y = 65;
      break;
    }
    case 3: {
      returnValue.x = 65;
      returnValue.y = 250;
      break;
    }
    case 4: {
      returnValue.x = 250;
      returnValue.y = 250;
      break;
    }
    case 5: {
      returnValue.x = 400;
      returnValue.y = 250;
      break;
    }
    case 6: {
      returnValue.x = 65;
      returnValue.y = 420;
      break;
    }
    case 7: {
      returnValue.x = 250;
      returnValue.y = 420;
      break;
    }
    case 8: {
      returnValue.x = 400;
      returnValue.y = 420;
      break;
    }
    default:
      return null;
      break;
  }
  return returnValue;
}

const convertPointToIndex = (point) => {
  let x = null;
  let y = null;
  if (point.x < 145) {
    x = 0;
  } else if (point.x >= 145 && point.x < 320) {
    x = 1;
  } else if (point.x >= 320 && point.x < 500) {
    x = 2;
  }
  if (point.y < 145) {
    y = 0;
  } else if (point.y >= 145 && point.y < 355) {
    y = 1;
  } else if (point.y >= 355 && point.y < 500) {
    y = 2;
  }
  return (x % 3) + (y * 3);
}

export default { convertIndexToPoint, convertPointToIndex };
