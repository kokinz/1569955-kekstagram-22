const getRandomNumber = (min = 0, max = 100) => {
  if (min >= 0 && max >= 0) {
    return (max >= min)
      ? Math.round(Math.random() * (max - min) + min)
      : Math.round(Math.random() * (min - max) + max);
  }

  throw new Error('Диапазон меньше нуля');
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const checkLengthOfString = (string, maxLength = 140) => {
  if (string === undefined) {
    throw new Error('Требуемый параметр строка (string)');
  }

  return string.length <= maxLength;
}

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}

const getRandomUniqueArrayNumber = (array = [], max = 10) => {
  let arrayId = getRandomNumber(1, max);

  if (array.length >= (max)) {
    throw new Error('Перебраны все числа до ' + max);
  }

  while (array.includes(arrayId)) {
    arrayId = getRandomNumber(1, max);
  }

  array.push(arrayId);

  return array[array.length - 1];
}

checkLengthOfString ('');

export {getRandomNumber, isEscEvent, isEnterEvent, checkLengthOfString, getRandomArrayElement, getRandomUniqueArrayNumber};
