import { Router } from 'express';

import { Routes } from '../../../core/interfaces/routes.interface';
import GraphController from '../controllers/graph.controller';
import authMiddleware from './../../auth/middlewares/auth.middleware';

export default class GraphRoute implements Routes {
  public pathNested = '/api/graph/';
  public router = Router();
  public controller = new GraphController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
  }
}
