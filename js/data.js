import {URL_GET_DATA, URL_SEND_DATA} from './settings.js';
import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const getData = (onSuccess) => {
  fetch(URL_GET_DATA)
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert('Данные не загружены');
    });
}

const sendData = (htmlForm) => {
  fetch(URL_SEND_DATA,{
    method: 'POST',
    body: htmlForm,
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then(() => showSuccessMessage())
    .catch(() => {
      showErrorMessage();
    });
}

export {getData, sendData};
