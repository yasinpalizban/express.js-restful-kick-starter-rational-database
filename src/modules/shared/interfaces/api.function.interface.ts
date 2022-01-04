import {NextFunction, Request, Response} from 'express';

export declare interface ApiFunctionInterface {

  index(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

  //
  show(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

  //
  create(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

  //
  update(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

  delete(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

  all(req: Request, res: Response, next: NextFunction): Promise<void|Response>;

}
