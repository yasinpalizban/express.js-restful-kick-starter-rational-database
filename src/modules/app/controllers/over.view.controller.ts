import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from '../../shared/controllers/api.controller';
import { IUserPagination } from '../../auth/interfaces/user.interface';
import { UrlQueryParam } from '../../shared/libraries/url.query.param';
import UserService from '../../common/services/user.service';

export default class OverViewController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const urlQueryParam = new UrlQueryParam(req);
      const userService = new UserService();
      const user: IUserPagination = await userService.index(urlQueryParam);
      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.receive'),
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
