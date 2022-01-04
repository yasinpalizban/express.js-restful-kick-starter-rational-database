import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import PermissionService from '../services/permission.service';
import { IPermission, IPermissionPagination } from '../interfaces/permission.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { PermissionEntity } from '@/modules/auth/entities/permission.entity';

export default class PermissionController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const permissionService = new PermissionService();
      const urlQueryParam = new UrlQueryParam(req);

      const result: IPermissionPagination = await permissionService.index(urlQueryParam);

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
      const permissionService = new PermissionService();
      const findOneData: IPermission[] = await permissionService.show(id);

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
      const permissionEntity = new PermissionEntity(req.body);
      permissionEntity.createNow();
      const permissionService = new PermissionService();

      await permissionService.create(permissionEntity);

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
      const permissionEntity = new PermissionEntity(req.body);
      permissionEntity.updateNow();
      const permissionService = new PermissionService();
      await permissionService.update(id, permissionEntity);

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
      const permissionService = new PermissionService();
      await permissionService.delete(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.remove'),
      });
    } catch (error) {
      next(error);
    }
  }
}
