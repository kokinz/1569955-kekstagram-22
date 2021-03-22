import {ALERT_SHOW_TIME} from './settings.js';

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

const isFocusElement = (element) => {
  return element === document.activeElement;
}

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const debounce = (callback, time) => {
  let interval = null;

  return (...functionArguments) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback.apply(this, functionArguments);
    }, time);
  }
}

export {isFocusElement, debounce, showAlert, getRandomNumber, isEscEvent, isEnterEvent, checkLengthOfString, getRandomArrayElement, getRandomUniqueArrayNumber};
