import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import ApiController from './../../shared/controllers/api.controller';
import { RequestWithUser } from '../../auth/interfaces/reqeust.with.user.interface';
import ProfileService from '../services/profile.service';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '../../auth/interfaces/user.interface';
import { isEmpty } from './../../shared/utils/is.empty';
import { IMulterFile } from './../../shared/interfaces/multer.file.interface';
import { optimizeImage } from './../../shared/utils/optimize.image';
import { commonConfig } from './../../common/configs/common.config';
import { IUserLogIn } from '@/modules/auth/interfaces/Log.in.interface';

export default class ProfileController extends ApiController {
  async index(req: RequestWithUser, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const user: IUserLogIn = req.user;
      const profileService = new ProfileService();
      const findOneData: IUser = await profileService.show(user.id);
      res.status(StatusCodes.OK).json({
        statusMessage: i18n.t('api.commons.receive'),
        data: findOneData,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const user: IUserLogIn = req.user;
      const userEntity = new UserEntity(req.body);
      await userEntity.updateNow().generatePasswordHash();
      const profileService = new ProfileService();
      if (!isEmpty(req.file)) {
        const file: IMulterFile = req.file;
        userEntity.image = commonConfig.profileDirectory + file.filename;
        await optimizeImage(file.destination + file.filename, 200, 200, 60);
      }

      await profileService.update(user.id, userEntity);
      res.status(StatusCodes.CREATED).json({
        statusMessage: i18n.t('api.commons.save'),
      });
    } catch (error) {
      next(error);
    }
  }
}
