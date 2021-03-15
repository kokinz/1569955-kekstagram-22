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





const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_SEPARATOR);
  
  const hashtagsArray = trimHashtagsSpaces(hashtags);
  
  console.log(checkHashtagsCorrect(hashtagsArray));
}











const onCommentInput = (evt) => {
  
  console.log(hashtags)
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
