import {isEscEvent, isEnterEvent} from './util.js';
import {gallery, pictures} from './pictures.js';
import {COMMENTS_SHOWN_COUNT} from './settings.js';

const pageBody = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsButton = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsShown = bigPicture.querySelector('.comments-shown');
const bigPictureCommentslist = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

let pictureId = 0;

const getElementId = (evt) => {
  for (let i = 0; i < gallery.length; i++) {
    if (evt.target.parentNode === gallery[i] || evt.target === gallery[i]) {
      pictureId = i;
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

const onCommentsButtonClick = (evt) => {
  evt.preventDefault();

  const lastCommentId = bigPictureCommentslist.children.length;
  const commentsCount = pictures[pictureId].comments.length;

  if (lastCommentId + COMMENTS_SHOWN_COUNT < commentsCount) {
    renderComments(lastCommentId + COMMENTS_SHOWN_COUNT);
  } else {
    renderComments(commentsCount);
    
    removeCommentsButtonListener();
    commentsButton.classList.add('hidden');
  }

  bigPictureCommentsShown.textContent = bigPictureCommentslist.children.length;
}

const closeBigPictureModal = (evt) => {
  evt.preventDefault();

  bigPicture.classList.add('hidden');

  commentsButton.classList.remove('hidden');

  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureClose.removeEventListener('keydown', onBigPictureEnterKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  removeCommentsButtonListener();

  bigPictureOpen.addEventListener('click', onPictureOpenClick);
  bigPictureOpen.addEventListener('keydown', onPictureEnterKeydown);
}

const openBigPictureModal = (evt) => {
  evt.preventDefault();

  bigPicture.classList.remove('hidden');

  commentsButton.classList.add('hidden');

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

  let countRenderComments;
  
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  bigPictureDescription.textContent = description;

  bigPictureCommentslist.innerHTML = '';

  if (comments.length > COMMENTS_SHOWN_COUNT) {
    countRenderComments = COMMENTS_SHOWN_COUNT;

    commentsButton.classList.remove('hidden');

    addCommentsButtonListener();
  } else {
    countRenderComments = comments.length;
  }
  
  renderComments(countRenderComments);

  bigPictureCommentsShown.textContent = bigPictureCommentslist.children.length;
}

const renderComments = (count) => {
  const commentFragment = document.createDocumentFragment();

  let lastCommentId = bigPictureCommentslist.children.length;

  for (lastCommentId; lastCommentId < count; lastCommentId++) {
    const commentListItem = document.createElement('li');
    commentListItem.classList.add('social__comment');

    const commentAvatar = document.createElement('img')
    commentAvatar.classList.add('social__picture');

    const commentText = document.createElement('p')
    commentText.classList.add('social__text');

    const {avatar, name, message} = pictures[pictureId].comments[lastCommentId];

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentListItem.appendChild(commentAvatar);

    commentText.textContent = message;
    commentListItem.appendChild(commentText);

    commentFragment.appendChild(commentListItem);
  }

  bigPictureCommentslist.appendChild(commentFragment);
}

const addPicturesListeners = () => {
  bigPictureOpen.addEventListener('click', onPictureOpenClick);
  bigPictureOpen.addEventListener('keydown', onPictureEnterKeydown);
}

const addCommentsButtonListener = () => {
  commentsButton.addEventListener('click', onCommentsButtonClick);
}

const removeCommentsButtonListener = () => {
  commentsButton.removeEventListener('click', onCommentsButtonClick);
}

export {addPicturesListeners};
