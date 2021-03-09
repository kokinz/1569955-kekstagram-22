import {checkLengthOfString} from './util.js';
import {createPhotoDescriptionArray} from './data.js';
import {renderPicures} from './pictures.js';
import './picture-modal.js';

const pictures = createPhotoDescriptionArray();
checkLengthOfString ('');
renderPicures(pictures);
