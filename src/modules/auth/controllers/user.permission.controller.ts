import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import { IUserPermission, IUserPermissionPagination } from '../interfaces/user.permission.interface';
import UserPermissionService from '../services/user.permission.service';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { UserPermissionEntity } from '@/modules/auth/entities/user.permission.entity';

export default class UserPermissionController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id: number = req.params.id ? +req.params : 0;
      const userPermissionService = new UserPermissionService();
      const urlQueryParam = new UrlQueryParam(req);

      const result: IUserPermissionPagination = await userPermissionService.setNestId(id).index(urlQueryParam);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.receive'),
        data: result.data,
        pager: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id: number = +req.params.id;
      const userPermissionService = new UserPermissionService();

      const findOneData: IUserPermission[] = await userPermissionService.show(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.receive'),
        data: findOneData,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const userPermissionEntity = new UserPermissionEntity(req.body);
      const userPermissionService = new UserPermissionService();
      await userPermissionService.create(userPermissionEntity);

      res.status(StatusCodes.CREATED).json({
        statusMessage: i18n.t('api.commons.save'),
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id: number = +req.params.id;
      const userPermissionEntity = new UserPermissionEntity(req.body);
      const userPermissionService = new UserPermissionService();
      await userPermissionService.update(id, userPermissionEntity);

      res.status(StatusCodes.CREATED).json({
        statusMessage: i18n.t('api.commons.update'),
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id: number = +req.params.id;
      const userPermissionService = new UserPermissionService();
      await userPermissionService.delete(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.remove'),
      });
    } catch (error) {
      next(error);
    }
  }
}
