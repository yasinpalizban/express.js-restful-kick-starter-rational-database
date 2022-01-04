import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import authMiddleware from './../../auth/middlewares/auth.middleware';
import SettingController from '../controllers/setting.controller';
import { SettingValidation } from '../validations/setting.validation';

export default class SettingRoute implements Routes {
  public pathNested = '/api/setting';
  public router = Router();
  public controller = new SettingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.get(`${this.pathNested}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.pathNested}`, authMiddleware, validationMiddleware(SettingValidation, 'body'), this.controller.create);
    this.router.put(`${this.pathNested}/:id`, authMiddleware, validationMiddleware(SettingValidation, 'body', true), this.controller.update);
    this.router.delete(`${this.pathNested}/:id`, authMiddleware, this.controller.delete);
  }
}
