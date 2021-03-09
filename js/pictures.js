import {createPhotoDescriptionArray} from './data.js';

const pictures = createPhotoDescriptionArray();
let gallery = [];

const renderPicures = () => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');

  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);

  gallery = document.querySelectorAll('a.picture');
}

export {pictures, gallery, renderPicures};
