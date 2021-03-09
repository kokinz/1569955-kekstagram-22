import {createPhotoDescriptionArray} from '/js/data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const pictures = createPhotoDescriptionArray();

const picturesFragment = document.createDocumentFragment();

const renderPicures = () => {
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
}

export {renderPicures};
