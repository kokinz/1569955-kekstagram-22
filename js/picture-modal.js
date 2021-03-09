import {isEscEvent, isEnterEvent} from './util.js';
import {gallery, pictures} from './pictures.js';

const pageBody = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

let pictureId = 0;

const getElementId = (evt) => {
  for (let i = 0; i < gallery.length; i++) {
    if (evt.target.parentNode === gallery[i]) {
      pictureId = i;
      console.log(pictureId);
      return i;
    }
  }
}

const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPictureModal(evt);
  }
}

const onBigPictureEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    closeBigPictureModal(evt);
  }
}

const onBigPictureCloseClick = (evt) => {
  closeBigPictureModal(evt);
}

const onPictureOpenClick = (evt) => {
  if (evt.target.className === ('picture__img' || 'picture')) {
    openBigPictureModal(evt);
  }
}

const onPictureEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    if (evt.target.className === 'picture') {
      openBigPictureModal(evt);
    }
  }
}

const closeBigPictureModal = (evt) => {
  evt.preventDefault();

  bigPicture.classList.add('hidden');

  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureClose.removeEventListener('keydown', onBigPictureEnterKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);

  bigPictureOpen.addEventListener('click', onPictureOpenClick);
  bigPictureOpen.addEventListener('keydown', onPictureEnterKeydown);
}

const openBigPictureModal = (evt) => {
  evt.preventDefault();

  bigPicture.classList.remove('hidden');

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  bigPictureClose.addEventListener('keydown', onBigPictureEnterKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);

  bigPictureOpen.removeEventListener('click', onPictureOpenClick);
  bigPictureOpen.removeEventListener('keydown', onPictureEnterKeydown);

  getElementId(evt);
  renderBigPicture();
}

const renderBigPicture = () => {
  const {url, likes, comments, description} = pictures[pictureId];

  console.log(url);

}

export {bigPictureOpen, onPictureOpenClick, onPictureEnterKeydown, renderBigPicture};
