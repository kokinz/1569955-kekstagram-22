import {RANDOM_PICTURES_COUNT, RENDER_PICTURES_DELAY} from './settings.js';
import {getRandomUniqueArrayNumber, throttle} from './util.js';


const picturesSortFiltersBlock = document.querySelector('.img-filters');
const picturesSortFiltersForm = document.querySelector('.img-filters__form');
const pictures = [];
const picturesDefaultSort = [];

let gallery = [];

const renderPicures = (array) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();
  
  pictures.length = 0;
  array.forEach(element => pictures.push(element));
  
  if (!picturesDefaultSort.length) {
    pictures.forEach(element => picturesDefaultSort.push(element));
  }
  
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);

  gallery = document.querySelectorAll('a.picture');
  
  picturesSortFiltersBlock.classList.remove('img-filters--inactive');
  
  addSortFiltersListener();
}

const rerenderPictures = throttle((array) => {
  gallery.forEach(picture => picture.parentNode.removeChild(picture));
  removeSortFiltersListener();
  renderPicures(array);
}, RENDER_PICTURES_DELAY);

const onSortFilterClick = (evt) => {
  const filters = picturesSortFiltersForm.querySelectorAll('.img-filters__button');
  const picturesSortArray = [];
  
  filters.forEach((filter) => {
    if (filter.classList.contains('img-filters__button--active')) {
      filter.classList.remove('img-filters__button--active');
    }
  });
  
  evt.target.classList.add('img-filters__button--active');
  
  switch (evt.target.id) {
    case 'filter-default':
      rerenderPictures(picturesDefaultSort);
      break;
    case 'filter-random':
      const randomIdArray = [];
  
      while (randomIdArray.length < RANDOM_PICTURES_COUNT) {
        getRandomUniqueArrayNumber(randomIdArray, picturesDefaultSort.length);
      }
      randomIdArray.forEach(id => picturesSortArray.push(picturesDefaultSort[id - 1]));
  
      rerenderPictures(picturesSortArray);
      break;
    case 'filter-discussed':
      const sortPictures = (pictureA, pictureB) => {
        return pictureB.comments.length - pictureA.comments.length;
      }
  
      picturesDefaultSort
        .slice()
        .sort(sortPictures)
        .forEach(picture => picturesSortArray.push(picture));
  
      rerenderPictures(picturesSortArray);
      break;
  }
}

const addSortFiltersListener = () => {
  picturesSortFiltersForm.addEventListener('click', onSortFilterClick);
}

const removeSortFiltersListener = () => {
  picturesSortFiltersForm.removeEventListener('click', onSortFilterClick);
}

export {pictures, gallery, renderPicures}
