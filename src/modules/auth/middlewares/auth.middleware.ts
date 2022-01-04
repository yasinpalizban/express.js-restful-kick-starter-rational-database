import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { default as i18n } from 'i18next';
import { StatusCodes } from 'http-status-codes';
import { DataStoredInToken } from '../interfaces/jwt.token.interface';
import { RequestWithUser } from '../interfaces/reqeust.with.user.interface';

import { RoleRouteService } from '../services/role.route.service';

import { IPermission } from '../interfaces/permission.interface';

import { IUserPermission } from '../interfaces/user.permission.interface';
import { IGroupPermission } from '../interfaces/group.permission.interface';
import { isEmpty } from './../../shared/utils/is.empty';
import DB from '@/core/databases/database';

import { ErrorType } from '../enums/error.type.enum';
import { IUserLogIn } from '../interfaces/Log.in.interface';
import { routeController } from '@/modules/auth/utils/route.controller';
import { IUser } from '@/modules/auth/interfaces/user.interface';
import { IUserGroup } from '@/modules/auth/interfaces/group.user.interface';
import { IGroup } from '@/modules/auth/interfaces/group.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || req.cookies['Authorization'] || null;

    if (isEmpty(Authorization)) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: i18n.t('middleWear.authToken'),
        type: ErrorType.Login,
      });
    }
    const ruleRoute = new RoleRouteService();
    const secretKey: string = config.get('jwt.secretKey');
    const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
    const userId = verificationResponse.id;

    const findUser: IUser = await DB.users.findByPk(userId);
    if (isEmpty(findUser)) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: i18n.t('middleWear.wrongAuth'),
        type: ErrorType.Login,
      });
    }

    const group: IGroup = await DB.group.prototype.getUserForGroup(findUser.id);
    const userLoggedIn: IUserLogIn = findUser;
    userLoggedIn.role = group;
    req.user = userLoggedIn;
    const controllerName = routeController(req.route.path);
    const permissions: IPermission = await DB.permission.findOne({ where: { active: true, name: controllerName } });

    if (isEmpty(permissions)) {
      const controllerRole: [] | null = ruleRoute.getRoleAccess(controllerName);

      if (controllerRole == null) {
        return next();
      }
      for (const role of controllerRole) {
        if (role == findUser[0].role.name) {
          return next();
        }
      }
    } else {
      const typeMethod = req.method;
      const userPermission: IUserPermission[] = await DB.userPermission.findAll({ where: { permissionId: permissions.id, userId: findUser.id },
      });
      const groupPermission: IGroupPermission[] = await DB.groupPermission.findAll({ where: { permissionId: permissions.id, groupId: group.id } });

      for (const isUser of userPermission) {
        if (isUser.userId == userLoggedIn.id && isUser.actions.search(typeMethod.toLowerCase()) !== -1) {
          return next();
        }
      }

      for (const isGroup of groupPermission) {
        if (isGroup.groupId == userLoggedIn.role.id && isGroup.actions.search(typeMethod.toLowerCase()) !== -1) {
          return next();
        }
      }
    }
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: i18n.t('middleWear.notEnoughPrivilege'),
      type: ErrorType.Permission,
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: i18n.t('middleWear.wrongAuth'),
      type: ErrorType.Login,
    });
  }
};

export default authMiddleware;
