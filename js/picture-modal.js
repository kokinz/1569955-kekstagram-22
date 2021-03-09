import {isEscEvent, isEnterEvent} from './util.js';

const pageBody = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');
  
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  
  pageBody.classList.add('modal-open');
}

bigPictureOpen.addEventListener('click', (evt) => {
  if (evt.target.className === ('picture__img' || 'picture')) {
    bigPicture.classList.remove('hidden');
  
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  
    pageBody.classList.add('modal-open');
  
    document.addEventListener('keydown', (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
    
        bigPicture.classList.add('hidden');
    
        commentsCount.classList.remove('hidden');
        commentsLoader.classList.remove('hidden');
        pageBody.classList.remove('modal-open');
      }
    });
  }
});

bigPictureOpen.addEventListener('keydown', (evt) => {
  if (evt.target.className === ('picture__img' || 'picture')) {
    if (isEnterEvent(evt)) {
      bigPicture.classList.remove('hidden');
  
      commentsCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
  
      pageBody.classList.add('modal-open');
    }
  }
});

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  pageBody.classList.remove('modal-open');
});

bigPictureClose.addEventListener('keydown', () => {
  if (isEnterEvent(evt)) {
    bigPicture.classList.add('hidden');
  
    commentsCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    pageBody.classList.remove('modal-open');
  }
});
