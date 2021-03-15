import {isEscEvent, isEnterEvent} from './util.js';
import {UPLOAD_SCALE_SETTINGS, FILTER_SETTINGS} from './settings.js';
import {addUploadTextListeners, removeUploadTextListeners} from './form-validation.js';
import '../nouislider/nouislider.js';

const pageBody = document.body;
const uploadOverlay = document.querySelector('.img-upload__overlay');

const uploadButton = document.querySelector('#upload-file');
const uploadButtonClose = uploadOverlay.querySelector('#upload-cancel');
const uploadButtonScaleBigger = uploadOverlay.querySelector('.scale__control--bigger');
const uploadButtonScaleSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const uploadButtonScaleValue = uploadOverlay.querySelector('.scale__control--value');

const uploadImgPreview = uploadOverlay.querySelector('.img-upload__preview img');
const uploadImgFilters = uploadOverlay.querySelectorAll('.effects__radio');
const uploadImgFiltersList = uploadOverlay.querySelector('.effects__list');
const uploadImgFilterValue = uploadOverlay.querySelector('.effect-level__value');
const uploadImgFilterSlider = uploadOverlay.querySelector('.effect-level__slider');

let filterName = '';

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeUploadModal(evt);
  }
}

const onUploadButtonCloseEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    closeUploadModal(evt);
  }
}

const onUploadButtonChange = (evt) => {
  openUploadModal(evt);
}

const openUploadModal = (evt) => {
  evt.preventDefault();

  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  uploadButtonClose.addEventListener('click' , closeUploadModal);
  uploadButtonClose.addEventListener('keydown', onUploadButtonCloseEnterKeydown);
  document.addEventListener('keydown', onUploadOverlayEscKeydown);

  uploadButton.removeEventListener('input', onUploadButtonChange);

  addUploadScaleListeners();
  addUploadFiltersListener();
  addUploadTextListeners();
}

const closeUploadModal = (evt) => {
  evt.preventDefault();

  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  uploadButton.value = '';

  uploadButtonClose.removeEventListener('click' , closeUploadModal);
  uploadButtonClose.removeEventListener('keydown', onUploadButtonCloseEnterKeydown);
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);

  uploadButton.addEventListener('input', onUploadButtonChange);

  uploadImgPreview.classList.remove(...uploadImgPreview.classList);

  removeUploadScaleListeners();
  removeUploadFiltersListener();
  removeUploadTextListeners();
}

const addUploadListeners = () => {
  uploadButton.addEventListener('input', onUploadButtonChange);
}

const changeValue  = (step) => {
  let newValue = parseInt(uploadButtonScaleValue.value) + step;
  uploadButtonScaleValue.value = newValue + '%';

  uploadImgPreview.style.transform = `scale(${newValue / 100})`;
}

const onButtonScaleSmaller = () => {
  if (uploadButtonScaleValue.value != `${UPLOAD_SCALE_SETTINGS.min}%`) {
    changeValue(-UPLOAD_SCALE_SETTINGS.step);
  }
}

const onButtonScaleBigger = () => {
  if (uploadButtonScaleValue.value != `${UPLOAD_SCALE_SETTINGS.max}%`) {
    changeValue(UPLOAD_SCALE_SETTINGS.step);
  }
}

const addUploadScaleListeners = () => {
  uploadImgPreview.style.transform = 'scale(1)';
  uploadButtonScaleValue.value = '100%';
  uploadButtonScaleSmaller.addEventListener('click', onButtonScaleSmaller);
  uploadButtonScaleBigger.addEventListener('click', onButtonScaleBigger);
}

const removeUploadScaleListeners = () => {
  uploadButtonScaleSmaller.removeEventListener('click', onButtonScaleSmaller);
  uploadButtonScaleBigger.removeEventListener('click', onButtonScaleBigger);
}

const onFiltersChange = () => {
  const currentFilter = uploadOverlay.querySelector('.effects__radio:checked');
  filterName = currentFilter.value;
  
  uploadImgPreview.classList.remove(...uploadImgPreview.classList);
  uploadImgPreview.classList.add(`effects__preview--${filterName}`);
  
  if ((filterName !== 'none') && (!uploadImgFilterSlider.firstChild)) {
    window.noUiSlider.create(uploadImgFilterSlider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: function(value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function(value) {
          return parseFloat(value);
        },
      },
    });
  
    uploadImgFilterValue.value = 100;
  
    uploadImgFilterSlider.noUiSlider.on('update', (_, handle, unencoded) => {
      uploadImgFilterValue.value = unencoded[handle];
      changeValueEffect(uploadImgFilterValue.value, filterName);
    });
  }
  
  if ((filterName === 'none') && (uploadImgFilterSlider.firstChild)) {
    resetFilters();
  }
  
  if (uploadImgFilterSlider.firstChild) {
    const {range, start, step} = FILTER_SETTINGS[filterName];
    uploadImgFilterSlider.noUiSlider.updateOptions({
      range: range,
      start: start,
      step: step,
    });
  }
  return
}

const changeValueEffect = (value, filter) => {
  uploadImgPreview.style.filter = 'none';
  
  switch (filter) {
    case 'chrome': 
      uploadImgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia': 
      uploadImgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      uploadImgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      uploadImgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      uploadImgPreview.style.filter = `brightness(${value})`;
      break;
    default:
      uploadImgPreview.style.filter = 'none';
  }
}

const addUploadFiltersListener = () => {
  uploadImgFilters[0].checked = true;
  
  uploadImgFiltersList.addEventListener('change', onFiltersChange);
}

const removeUploadFiltersListener = () => {
  resetFilters();
  
  uploadImgFiltersList.removeEventListener('change', onFiltersChange);
}

const resetFilters = () => {
  uploadImgPreview.style.filter = 'none';
  uploadImgFilterSlider.noUiSlider.destroy();
  uploadImgPreview.classList.remove(...uploadImgPreview.classList);
}

export {addUploadListeners};
