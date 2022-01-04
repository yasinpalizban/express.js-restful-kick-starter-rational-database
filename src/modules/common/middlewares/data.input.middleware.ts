import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import { ErrorType } from '../../auth/enums/error.type.enum';

const dataInputMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const method: string = req.method.toLowerCase();
  if (method == 'post' || method == 'put') {
    if (!req.is('application/json') && !req.is('multipart/form-data')) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: i18n.t('middleWear.dataInput'),
        type: ErrorType.DataInput,
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

export default dataInputMiddleware;
