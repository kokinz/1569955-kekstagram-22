import {isEscEvent, isEnterEvent, isFocusElement, changeClassOnModalOpen, changeClassOnModalClose} from './util.js';
import {UPLOAD_SCALE_SETTINGS, FILTER_SETTINGS, FILE_TYPES} from './settings.js';
import {sendData} from './data.js';
import {addUploadTextListeners, removeUploadTextListeners} from './form-validation.js';
import '../../build/nouislider/nouislider.js';
import nouislider from '../../build/nouislider/nouislider.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');

const uploadButton = document.querySelector('#upload-file');
const uploadButtonClose = uploadOverlay.querySelector('#upload-cancel');
const uploadButtonScaleBigger = uploadOverlay.querySelector('.scale__control--bigger');
const uploadButtonScaleSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const uploadButtonScaleValue = uploadOverlay.querySelector('.scale__control--value');

const uploadImgPreview = uploadOverlay.querySelector('.img-upload__preview img');
const uploadEffectsPreview = document.querySelectorAll('.effects__preview');
const uploadImgFilters = uploadOverlay.querySelectorAll('.effects__radio');
const uploadImgFiltersList = uploadOverlay.querySelector('.effects__list');
const uploadImgFilterValue = uploadOverlay.querySelector('.effect-level__value');
const uploadImgFilterSlider = uploadOverlay.querySelector('.effect-level__slider');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

let filterName = '';

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt) && (!isFocusElement(hashtagsInput) && !isFocusElement(commentInput))) {
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

  downloadImgPreview();

  changeClassOnModalOpen(uploadOverlay);

  uploadButtonClose.addEventListener('click' , closeUploadModal);
  uploadButtonClose.addEventListener('keydown', onUploadButtonCloseEnterKeydown);
  document.addEventListener('keydown', onUploadOverlayEscKeydown);

  uploadButton.removeEventListener('input', onUploadButtonChange);

  addUploadScaleListeners();
  addUploadFiltersListener();
  addUploadTextListeners();
  addUploadFormListener();
}

const closeUploadModal = (evt) => {
  evt.preventDefault();

  changeClassOnModalClose(uploadOverlay);

  uploadButton.value = '';
  uploadImgFilterValue.value = 100;

  uploadButtonClose.removeEventListener('click' , closeUploadModal);
  uploadButtonClose.removeEventListener('keydown', onUploadButtonCloseEnterKeydown);
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);

  uploadButton.addEventListener('input', onUploadButtonChange);

  uploadImgPreview.classList.remove(...uploadImgPreview.classList);
  uploadImgPreview.src = '';

  removeUploadScaleListeners();
  removeUploadFiltersListener();
  removeUploadTextListeners();
  removeUploadFormListener();
}

const downloadImgPreview = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadImgPreview.src = reader.result;
      uploadEffectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url(${reader.result})`;
      })
    });

    reader.readAsDataURL(file);
  }
}

const addUploadListeners = () => {
  uploadButton.addEventListener('change', onUploadButtonChange);
}

const changeValue  = (step) => {
  let newValue = parseInt(uploadButtonScaleValue.value) + step;
  uploadButtonScaleValue.value = newValue + '%';

  uploadImgPreview.style.transform = `scale(${newValue / 100})`;
}

const onButtonScaleSmaller = () => {
  if (uploadButtonScaleValue.value !== `${UPLOAD_SCALE_SETTINGS.min}%`) {
    changeValue(-UPLOAD_SCALE_SETTINGS.step);
  }
}

const onButtonScaleBigger = () => {
  if (uploadButtonScaleValue.value !== `${UPLOAD_SCALE_SETTINGS.max}%`) {
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
    nouislider.create(uploadImgFilterSlider, {
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
  if (uploadImgFilterSlider.firstChild) {
    uploadImgFilterSlider.noUiSlider.destroy();
  }
  uploadImgPreview.classList.remove(...uploadImgPreview.classList);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const htmlForm = new FormData(evt.target);

  sendData(htmlForm);
  closeUploadModal(evt);
}

const addUploadFormListener = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
}

const removeUploadFormListener = () => {
  uploadForm.removeEventListener('submit', onFormSubmit);
}

export {addUploadListeners};
