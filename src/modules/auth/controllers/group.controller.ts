import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { IGroup, IGroupPagination } from '../interfaces/group.interface';
import GroupService from '../services/group.service';
import { GroupEntity } from '@/modules/auth/entities/group.entity';

export default class GroupController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const groupService = new GroupService();
      const urlQueryParam = new UrlQueryParam(req);

      const result: IGroupPagination = await groupService.index(urlQueryParam);

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
      const groupService = new GroupService();
      const findOneData: IGroup[] = await groupService.show(id);

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
      const groupEntity = new GroupEntity(req.body);
      const groupService = new GroupService();
      await groupService.create(groupEntity);

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
      const groupEntity = new GroupEntity(req.body);
      const groupService = new GroupService();
      await groupService.update(id, groupEntity);

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
      const groupService = new GroupService();
      await groupService.delete(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.remove'),
      });
    } catch (error) {
      next(error);
    }
  }
}
