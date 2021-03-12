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

const UPLOAD_SCALE_SETTINGS = {
  min: 25,
  max: 100,
  step: 25,
}

const FILTER_SETTINGS = {
  none: 'none',
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

export {PHOTOS_COUNT, MIN_LIKES, MAX_LIKES, MAX_AVATARS, MAX_COMMENTS, COMMENTS_ID_MAX, COMMENTS_ID, NAMES, MESSAGES, DESCRIPTIONS, UPLOAD_SCALE_SETTINGS, FILTER_SETTINGS};
