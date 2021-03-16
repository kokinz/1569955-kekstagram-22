import {checkLengthOfString} from './util.js';
import {HASHTAGS_SEPARATOR, HASHTAGS_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH} from './settings.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const isFocusHashtagsInput = () => {
  return hashtagsInput === document.activeElement;
}

const isFocusCommentInput = () => {
  return commentInput === document.activeElement;
}

const trimHashtagsSpaces = (array) => {
  return array.filter((word) => {
    return word.length > 0;
  });
}

const checkHashtagsCount = (array) => {
  return array.length <= HASHTAGS_COUNT;
}

const checkHashtagsCorrect = (array) => {
  const hashtagRegex = RegExp(`^#[A-Za-zА-ЯЁа-яё0-9]{1,${HASHTAG_MAX_LENGTH - 1}}$`);

  return array.every((word) => {
    return hashtagRegex.test(word);
  });
}

const checkUniqHashtags = (array) => {
  const lowerCaseHashtags = array.map((element) => {
    return element.toLowerCase();
  });
  const uniqHashtags = new Set(lowerCaseHashtags);

  return uniqHashtags.size === array.length;
}

const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_SEPARATOR);
  const hashtagsArray = trimHashtagsSpaces(hashtags);

  if (hashtagsInput.value) {
    if (!checkHashtagsCorrect(hashtagsArray)) {
      hashtagsInput.setCustomValidity(`Хэш-тег начинается с # (решетки), состоит из букв и чисел, и не длиннее ${HASHTAG_MAX_LENGTH} символов`);
      hashtagsInput.style = 'border: 1px solid red';
    } else
    if (!checkUniqHashtags(hashtagsArray)) {
      hashtagsInput.setCustomValidity('Хэш-теги не могут повторятся');
      hashtagsInput.style = 'border: 1px solid red';
    } else
    if (!checkHashtagsCount(hashtagsArray)) {
      hashtagsInput.setCustomValidity(`Максимальное количество хэш-тегов  ${HASHTAGS_COUNT}`);
      hashtagsInput.style = 'border: 1px solid red';
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.removeAttribute('style');
    }
  } else {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.removeAttribute('style');
  }

  hashtagsInput.reportValidity();
}

const onCommentInput = () => {
  if (!checkLengthOfString(commentInput.value, COMMENT_MAX_LENGTH)) {
    commentInput.setCustomValidity(`Комментарий не может быть длиннее ${COMMENT_MAX_LENGTH} символов`);
    commentInput.style = 'border: 1px solid red';
  } else {
    commentInput.setCustomValidity('');
    commentInput.removeAttribute('style');
  }

  commentInput.reportValidity();
}

const addUploadTextListeners = () => {
  hashtagsInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);
}

const removeUploadTextListeners = () => {
  hashtagsInput.removeEventListener('input', onHashtagInput);
  commentInput.removeEventListener('input', onCommentInput);
}

export {addUploadTextListeners, removeUploadTextListeners, isFocusHashtagsInput, isFocusCommentInput};
