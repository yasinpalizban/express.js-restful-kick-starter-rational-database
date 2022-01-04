import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import PermissionController from '../controllers/permission.controller';
import { PermissionValidation } from '../validations/permission.validation';

export default class PermissionRoute implements Routes {
  public pathNested = '/api/permission';
  public router = Router();
  public controller = new PermissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.get(`${this.pathNested}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.pathNested}`, authMiddleware, validationMiddleware(PermissionValidation, 'body'), this.controller.create);
    this.router.put(`${this.pathNested}/:id`, authMiddleware, validationMiddleware(PermissionValidation, 'body', true), this.controller.update);
    this.router.delete(`${this.pathNested}/:id`, authMiddleware, this.controller.delete);
  }
}
