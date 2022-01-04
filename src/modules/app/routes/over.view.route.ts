import { Router } from 'express';
import OverViewController from '../controllers/over.view.controller';
import { Routes } from '../../../core/interfaces/routes.interface';
import authMiddleware from './../../auth/middlewares/auth.middleware';

export default class OverViewRoute implements Routes {
  public pathNested = '/api/overView/';
  public router = Router();
  public controller = new OverViewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
  }
}
