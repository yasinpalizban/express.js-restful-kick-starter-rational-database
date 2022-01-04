import { default as i18n } from 'i18next';

export function multerFunctions(req, file, cb): void {
  cb(null, Math.floor(Date.now() / 1000) + '.' + file.mimetype.split('/')[1]);
}

export function multerFileFilter(req, file, cb): void {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(new Error(i18n.t('api.events.fileMimiType')), false); // if validation failed then generate error
  }
}
