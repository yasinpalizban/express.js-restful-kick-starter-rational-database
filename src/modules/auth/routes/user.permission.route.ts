import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import UserPermissionController from '../controllers/user.permission.controller';
import { UserPermissionValidation } from '../validations/user.permission.validation';

export default class UserPermissionRoute implements Routes {
  public pathNested = '/api/permission/:id/userPermission';
  public path = '/api/userPermission';

  public router = Router({ mergeParams: true });
  public controller = new UserPermissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(UserPermissionValidation, 'body'), this.controller.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(UserPermissionValidation, 'body', true), this.controller.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


  }
}
