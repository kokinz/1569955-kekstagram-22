import {renderPicures} from './pictures.js';
import {addPicturesListeners} from './picture-modal.js';
import {addUploadListeners} from './upload-modal.js';
import {getData} from './data.js';

getData(renderPicures);
addPicturesListeners();
addUploadListeners();
