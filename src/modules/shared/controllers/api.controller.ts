import express, { NextFunction, Request, Response, Router } from 'express';
import { ApiFunctionInterface } from '../interfaces/api.function.interface';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';

class ApiController implements ApiFunctionInterface {
  async all(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.OK).json({
      statusMessage: i18n.t('api.errors.rest.index'),
    });
  }

  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.OK).json({
      statusMessage: i18n.t('api.errors.rest.index'),
    });
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.OK).json({
      statusMessage: i18n.t('api.errors.rest.show'),
    });
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.CREATED).json({
      statusMessage: i18n.t('api.errors.rest.create'),
    });
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.OK).json({
      statusMessage: i18n.t('api.errors.rest.update'),
    });
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    res.status(StatusCodes.OK).json({
      statusMessage: i18n.t('api.errors.rest.delete'),
    });
  }
}

export default ApiController;
