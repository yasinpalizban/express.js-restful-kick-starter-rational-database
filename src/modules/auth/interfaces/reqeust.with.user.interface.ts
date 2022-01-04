import { Request } from 'express';
import { IUserLogIn } from './Log.in.interface';

export interface RequestWithUser extends Request {
  user: IUserLogIn;
  file: any;

}
