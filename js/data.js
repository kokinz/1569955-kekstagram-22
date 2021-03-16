import {URL_GET_DATA, URL_SEND_DATA} from './settings.js';
import {showAlert} from './util.js';

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

const sendData = (htmlForm, onSuccess, onError) => {
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
    .then(() => onSuccess())
    .catch((err) => {
      onError(err);
    });
}

export {getData, sendData};
