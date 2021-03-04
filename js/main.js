'use strict';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_AVATARS = 6;
const MAX_COMMENTS = 10;
const COMMENTS_ID_MAX = 200;
const COMMENTS_ID = [];

const NAMES = ['Анна', 'Валерия', 'Павел', 'Роман', 'Вера', 'Елена', 'Анастасия', 'Николай', 'Татьяна', 'Михаил'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Лучшее фото!',
  'Креатив',
  'Очень красиво',
  'Прикольно.',
  'Мощно!',
  'Когда хочется кушать',
  'Люблю когда так',
];

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

const createComment = (array, max) => {
  return {
    id: getRandomUniqueArrayNumber(array, max),
    avatar: `img/avatar-${getRandomNumber(1, MAX_AVATARS)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

const createCommentArray = () => {
  const comments = [];
  let count = getRandomNumber(1, MAX_COMMENTS);

  for (let i = 1; i <= count; i++) {
    comments.push(createComment(COMMENTS_ID, COMMENTS_ID_MAX));
  }

  return comments;
}

const createPhotoDescription = (number) => {
  return {
    id: number,
    url: `photos/${number}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: createCommentArray(),
  };
};

const createPhotoDescriptionArray = () => {
  const photos = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(createPhotoDescription(i));
  }

  return photos;
}

checkLengthOfString ();
createPhotoDescriptionArray();

