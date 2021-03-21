const HASHTAGS_SEPARATOR = ' ';
const HASHTAGS_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const COMMENTS_SHOWN_COUNT = 5;
const URL_GET_DATA = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/kekstagram';
const ALERT_SHOW_TIME = 5000;
const RANDOM_PICTURES_COUNT = 10;
const RENDER_PICTURES_DELAY = 500;

const UPLOAD_SCALE_SETTINGS = {
  min: 25,
  max: 100,
  step: 25,
}

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

export {FILE_TYPES, RENDER_PICTURES_DELAY, URL_GET_DATA, URL_SEND_DATA, ALERT_SHOW_TIME, HASHTAGS_SEPARATOR, HASHTAGS_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH, UPLOAD_SCALE_SETTINGS, FILTER_SETTINGS, RANDOM_PICTURES_COUNT, COMMENTS_SHOWN_COUNT};
