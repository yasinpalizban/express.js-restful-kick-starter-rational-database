import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import GroupPermissionService from '../services/group.permission.service';
import { IGroupPermission, IGroupPermissionPagination } from '../interfaces/group.permission.interface';

import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { IGroup } from '@/modules/auth/interfaces/group.interface';
import { GroupPermissionEntity } from '@/modules/auth/entities/group.permission.entity';

export default class GroupPermissionController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id: number = req.params.id ? +req.params : 0;
      const groupPermissionService = new GroupPermissionService();
      const urlQueryParam = new UrlQueryParam(req);

      const result: IGroupPermissionPagination = await groupPermissionService.setNestId(id).index(urlQueryParam);

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

      const groupPermissionService = new GroupPermissionService();
      const findOneData: IGroupPermission[] = await groupPermissionService.show(id);

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
      const groupPermissionEntity = new GroupPermissionEntity(req.body);
      const groupPermissionService = new GroupPermissionService();
      await groupPermissionService.create(groupPermissionEntity);

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
      const groupPermissionEntity = new GroupPermissionEntity(req.body);
      const groupPermissionService = new GroupPermissionService();
      await groupPermissionService.update(id, groupPermissionEntity);

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
      const groupPermissionService = new GroupPermissionService();
      await groupPermissionService.delete(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.remove'),
      });
    } catch (error) {
      next(error);
    }
  }
}
