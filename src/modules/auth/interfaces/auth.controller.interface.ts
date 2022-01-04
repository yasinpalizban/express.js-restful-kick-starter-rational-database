import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/reqeust.with.user.interface';

export declare interface AuthControllerInterface {
  signUp(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  signIn(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  signOut(req: RequestWithUser, res: Response, next: NextFunction): Promise<void | Response>;

  forgot(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  activationViaEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  sendActivateCodeViaEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  activationViaSms(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  sendActivateCodeViaSms(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  resetPasswordViaEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  resetPasswordViaSms(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
