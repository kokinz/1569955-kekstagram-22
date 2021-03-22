import {checkLengthOfString} from './util.js';
import {HASHTAGS_SEPARATOR, HASHTAGS_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH} from './settings.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

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

const setCustomValidityErrorMessage = (element, message) => {
  element.setCustomValidity(message);
  element.style = 'border: 1px solid red';
}

const resetCustomValidityMessage = (element) => {
  element.setCustomValidity('');
  element.removeAttribute('style');
}

const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_SEPARATOR);
  const hashtagsArray = trimHashtagsSpaces(hashtags);

  if (hashtagsInput.value) {
    if (!checkHashtagsCorrect(hashtagsArray)) {
      setCustomValidityErrorMessage(hashtagsInput, `Хэш-тег начинается с # (решетки), состоит из букв и чисел, и не длиннее ${HASHTAG_MAX_LENGTH} символов`);
    } else
    if (!checkUniqHashtags(hashtagsArray)) {
      setCustomValidityErrorMessage(hashtagsInput, 'Хэш-теги не могут повторятся');
    } else
    if (!checkHashtagsCount(hashtagsArray)) {
      setCustomValidityErrorMessage(hashtagsInput, `Максимальное количество хэш-тегов  ${HASHTAGS_COUNT}`);
    } else {
      resetCustomValidityMessage(hashtagsInput);
    }
  } else {
    resetCustomValidityMessage(hashtagsInput);
  }

  hashtagsInput.reportValidity();
}

const onCommentInput = () => {
  if (!checkLengthOfString(commentInput.value, COMMENT_MAX_LENGTH)) {
    setCustomValidityErrorMessage(commentInput, `Комментарий не может быть длиннее ${COMMENT_MAX_LENGTH} символов`);
  } else {
    resetCustomValidityMessage(commentInput);
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

export {addUploadTextListeners, removeUploadTextListeners};
