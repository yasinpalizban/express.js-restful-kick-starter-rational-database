import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from '../../shared/controllers/api.controller';

export default class GraphController extends ApiController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      // data goes here
      const chartBarV: any = [
        { name: 'Mobiles', value: 105000 },
        { name: 'Laptop', value: 55000 },
        { name: 'AC', value: 15000 },
        { name: 'Headset', value: 150000 },
        { name: 'Fridge', value: 20000 },
      ];

      const pieChart: any = [
        { name: 'Mobiles', value: 105000 },
        { name: 'Laptop', value: 55000 },
        { name: 'AC', value: 15000 },
        { name: 'Headset', value: 150000 },
        { name: 'Fridge', value: 20000 },
      ];
      const pieGrid: any = [
        { name: 'Mobiles', value: 8000 },
        { name: 'Laptop', value: 5600 },
        { name: 'AC', value: 5500 },
        { name: 'Headset', value: 15000 },
        { name: 'Fridge', value: 2100 },
      ];

      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.receive'),
        pieGrid: pieGrid,
        pieChart: pieChart,
        chartBar: chartBarV,
      });
    } catch (error) {
      next(error);
    }
  }
}
