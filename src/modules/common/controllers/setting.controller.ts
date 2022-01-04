import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import SettingService from '../services/setting.service';
import { ISetting, ISettingPagination } from '../interfaces/setting.interface';
import { SettingEntity } from '../entities/setting.entity';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';

export default class SettingController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const settingService = new SettingService();
      const urlQueryParam = new UrlQueryParam(req);
      const result: ISettingPagination = await settingService.index(urlQueryParam);

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
      const settingService = new SettingService();
      const findOneData: ISetting[] = await settingService.show(id);

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
      const settingEntity = new SettingEntity(req.body);
      settingEntity.createNow();
      const settingService = new SettingService();
      await settingService.create(settingEntity);

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
      const settingEntity = new SettingEntity(req.body);
      settingEntity.updateNow();
      const settingService = new SettingService();
      await settingService.update(id, settingEntity);

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
      const settingService = new SettingService();
      await settingService.delete(id);

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.remove'),
      });
    } catch (error) {
      next(error);
    }
  }
}
