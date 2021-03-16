import {isEscEvent} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const documentMain = document.querySelector('main');

const onSuccessButtonClick = () => {
  const successMessageHtml = document.querySelector('.success');

  successMessageHtml.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

const onSuccessOverlayClick = (evt) => {
  const successMessageHtml = document.querySelector('.success');

  if (evt.target === successMessageHtml) {
    onSuccessButtonClick();
  }
}

const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onSuccessButtonClick();
  }
}

const onErrorButtonClick = () => {
  const errorMessageHtml = document.querySelector('.error');

  errorMessageHtml.remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
}

const onErrorOverlayClick = (evt) => {
  const errorMessageHtml = document.querySelector('.error');

  if (evt.target === errorMessageHtml) {
    onErrorButtonClick();
  }
}

const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onErrorButtonClick();
  }
}

const showSuccessMessage = () => {
  const successMessageHtml = successMessage.cloneNode(true);

  documentMain.appendChild(successMessageHtml);

  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', onSuccessButtonClick);
  successMessageHtml.addEventListener('click', onSuccessOverlayClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
}

const showErrorMessage = () => {
  const errorMessageHtml = errorMessage.cloneNode(true);

  documentMain.appendChild(errorMessageHtml);

  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', onErrorButtonClick);
  errorMessageHtml.addEventListener('click', onErrorOverlayClick);
  document.addEventListener('keydown', onErrorEscKeydown);
}

export {showSuccessMessage, showErrorMessage};
