import { Router } from 'express';
import { Routes } from '../../../core/interfaces/routes.interface';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import authMiddleware from './../../auth/middlewares/auth.middleware';
import UserController from '../controllers/user.controller';
import { UsersPostValidation } from '../validations/users.post.validation';
import { UsersPutValidation } from '../validations/users.put.validation';

export default class UserRoute implements Routes {
  public pathNested = '/api/user';
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.get(`${this.pathNested}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.pathNested}`, authMiddleware, validationMiddleware(UsersPostValidation, 'body'), this.controller.create);
    this.router.put(`${this.pathNested}/:id`, authMiddleware, validationMiddleware(UsersPutValidation, 'body', true), this.controller.update);
    this.router.delete(`${this.pathNested}/:id`, authMiddleware, this.controller.delete);
  }
}
