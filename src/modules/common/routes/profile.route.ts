import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import authMiddleware from './../../auth/middlewares/auth.middleware';
import ProfileController from '../controllers/profile.controller';
import { ProfileValidation } from '../validations/profile.validation';
import multer from 'multer';
import { commonConfig } from '../configs/common.config';

import { sharedConfig } from './../../shared/configs/shared.config';
import { multerFileFilter, multerFunctions } from './../../shared/utils/multer.functions';

export default class ProfileRoute implements Routes {
  public pathNested = '/api/profile';
  public router = Router();
  public controller = new ProfileController();
  private maxSize = 4 * 1000 * 1000;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const storage = multer.diskStorage({
      destination: sharedConfig.appRoot + commonConfig.profileDirectory,
      filename: multerFunctions,
    });

    const upload = multer({ storage: storage, fileFilter: multerFileFilter, limits: { fileSize: this.maxSize } });
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.post(
      `${this.pathNested}`,
      authMiddleware,
      upload.single('image'),
      validationMiddleware(ProfileValidation, 'body'),
      this.controller.create,
    );
  }
}
