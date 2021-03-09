import {getRandomNumber, getRandomArrayElement, getRandomUniqueArrayNumber} from '/js/util.js';
import {MAX_AVATARS, MESSAGES, NAMES, MAX_COMMENTS, COMMENTS_ID, COMMENTS_ID_MAX, DESCRIPTIONS, MIN_LIKES, MAX_LIKES, PHOTOS_COUNT} from '/js/settings.js';

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
  const count = getRandomNumber(1, MAX_COMMENTS);

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

export {createComment, createCommentArray, createPhotoDescription, createPhotoDescriptionArray};
