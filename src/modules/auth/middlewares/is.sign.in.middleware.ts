import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { default as i18n } from 'i18next';
import { StatusCodes } from 'http-status-codes';
import { DataStoredInToken } from '../interfaces/jwt.token.interface';
import { RequestWithUser } from '../interfaces/reqeust.with.user.interface';
import { IUser } from '../interfaces/user.interface';
import DB from '@/core/databases/database';

const isSignInMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || req.cookies['Authorization'] || null;
    if (Authorization) {
      const secretKey: string = config.get('jwt.secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const findUser: IUser = await DB.users.findByPk(userId);

      if (findUser) {
        res.status(StatusCodes.NOT_MODIFIED).json({
          error: i18n.t('middleWear.youAlreadySignedIn'),
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

export default isSignInMiddleware;
