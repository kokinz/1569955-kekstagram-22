const picturesSortFiltersBlock = document.querySelector('.img-filters');
const picturesSortFiltersForm = document.querySelector('.img-filters__form');
const pictures = [];
let gallery = [];

const renderPicures = (array) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();
  
  array.forEach(element => pictures.push(element));
  
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

const onSortFilterClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button--active')) {
    return
  } else {
    const filters = picturesSortFiltersForm.querySelectorAll('.img-filters__button');
    
    filters.forEach((filter) => {
      if (filter.classList.contains('img-filters__button--active')) {
        filter.classList.remove('img-filters__button--active');
      }
    });
    
    evt.target.classList.add('img-filters__button--active');
    
    switch(evt.target.id) {
      case 'filter-default' : 
        console.log('default');
        break;
      case 'filter-random' : 
        console.log('random');
        break;
      case 'filter-discussed' : 
        console.log('discussed');
        break;
    }
  }
}

const addSortFiltersListener = () => {
  picturesSortFiltersForm.addEventListener('click', onSortFilterClick);
}

export {pictures, gallery, renderPicures}
