import {checkLengthOfString} from './util.js';
import {renderPicures} from './pictures.js';
import {bigPictureOpen, onPictureOpenClick, onPictureEnterKeydown} from './picture-modal.js';
import './upload-modal.js';

checkLengthOfString ('');
renderPicures();

bigPictureOpen.addEventListener('click', onPictureOpenClick);
bigPictureOpen.addEventListener('keydown', onPictureEnterKeydown);
