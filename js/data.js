import {URL_GET_DATA} from './settings.js';

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

export {getData};
