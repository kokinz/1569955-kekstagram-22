'use strict';

const getRandomNumber = (min = 0, max = 100) => {
  if (min >= 0 && max >= 0) {
    return (max >= min)
      ? Math.round(Math.random() * (max - min) + min)
      : Math.round(Math.random() * (min - max) + max);
  }

  throw new Error('Диапазон меньше нуля');
}

const checkLengthOfString = (string, maxLength = 140) => {
  return string.length <= maxLength;
}

getRandomNumber ();
checkLengthOfString ();
