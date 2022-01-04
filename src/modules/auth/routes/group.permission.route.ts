import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import { GroupPermissionValidation } from '../validations/group.permission.validation';
import GroupPermissionController from '../controllers/group.permission.controller';

export default class GroupPermissionRoute implements Routes {
  public pathNested = '/api/permission/:id/groupPermission';
  public path = '/api/groupPermission';

  public router = Router({ mergeParams: true });
  public controller = new GroupPermissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /** nest route */
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    /* no nest route*/
    this.router.get(`${this.path}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(GroupPermissionValidation, 'body'), this.controller.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(GroupPermissionValidation, 'body', true), this.controller.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);

  }
}
