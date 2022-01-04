import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import { UserEntity } from '../entities/user.entity';
import { IUser, IUserPagination } from '../../auth/interfaces/user.interface';
import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { IPagination } from '@/modules/shared/interfaces/pagination';
import DB from '@/core/databases/database';
import { IUserGroup } from '@/modules/auth/interfaces/group.user.interface';
import Sequelize, { Op } from 'sequelize';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';

export default class UserService implements ServiceInterface {
  public userModel = DB.users;
  public userGroupModel = DB.userGroup;

  public async index(urlQueryParam: UrlQueryParam): Promise<IUserPagination> {
    const defaultPipeline: AggregatePipeLine = {
      attributes: [
        [Sequelize.literal('`UserModel`.`id`'), 'id'],
        [Sequelize.literal('`UserModel`.`username`'), 'username'],
        [Sequelize.literal('`UserModel`.`email`'), 'email'],
        [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        [Sequelize.literal('`UserModel`.`image`'), 'image'],
        [Sequelize.literal('`UserModel`.`gender`'), 'gender'],
        [Sequelize.literal('`UserModel`.`birthday`'), 'birthday'],
        [Sequelize.literal('`UserModel`.`country`'), 'country'],
        [Sequelize.literal('`UserModel`.`address`'), 'address'],
        [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        [Sequelize.literal('`UserModel`.`status`'), 'status'],
        [Sequelize.literal('`UserModel`.`status_message`'), 'statusMessage'],
        [Sequelize.literal('`UserModel`.`active`'), 'active'],
        [Sequelize.literal('`UserModel`.`created_at`'), 'createdAt'],
        [Sequelize.literal('`UserModel`.`updated_at`'), 'updatedAt'],
        [Sequelize.literal('`UserModel`.`deleted_at`'), 'deletedAt'],
        [Sequelize.literal('`GroupModel`.`name`'), 'group'],
      ],
      include: [
        {
          model: DB.users,
          attributes: [],
        },
        {
          model: DB.group,
          attributes: [],
        },
      ],
    };

    const pipeLine: AggregatePipeLine = urlQueryParam.decodeQueryParam().getPipeLine(defaultPipeline);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { docs, pages, total } = await this.userGroupModel.paginate(pipeLine);
    const data: IUser[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<IUser[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));
    const dataById: IUser | any = await this.userGroupModel.findOne({
      where: { userId: id },
      attributes: [
        [Sequelize.literal('`UserModel`.`id`'), 'id'],
        [Sequelize.literal('`UserModel`.`username`'), 'username'],
        [Sequelize.literal('`UserModel`.`email`'), 'email'],
        [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        [Sequelize.literal('`UserModel`.`image`'), 'image'],
        [Sequelize.literal('`UserModel`.`gender`'), 'gender'],
        [Sequelize.literal('`UserModel`.`birthday`'), 'birthday'],
        [Sequelize.literal('`UserModel`.`country`'), 'country'],
        [Sequelize.literal('`UserModel`.`address`'), 'address'],
        [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        [Sequelize.literal('`UserModel`.`status`'), 'status'],
        [Sequelize.literal('`UserModel`.`status_message`'), 'statusMessage'],
        [Sequelize.literal('`UserModel`.`active`'), 'active'],
        [Sequelize.literal('`UserModel`.`created_at`'), 'createdAt'],
        [Sequelize.literal('`UserModel`.`updated_at`'), 'updatedAt'],
        [Sequelize.literal('`UserModel`.`deleted_at`'), 'deletedAt'],
        [Sequelize.literal('`GroupModel`.`name`'), 'group'],
      ],
      include: [
        {
          model: DB.users,
          attributes: [],
        },
        {
          model: DB.group,
          attributes: [],
        },
      ],
    });

    if (!dataById) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.exist'));
    return [dataById];
  }

  public async create(userEntity: UserEntity): Promise<void> {
    if (isEmpty(userEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    if (userEntity.email) {
      const isEmailUserValid: IUser = await this.userModel.findOne({ where: { email: userEntity.email } });
      if (isEmailUserValid) throw new HttpException(StatusCodes.CONFLICT, i18n.t('auth.youAreEmail'));
    }
    if (userEntity.phone) {
      const isPhoneUserValid: IUser = await this.userModel.findOne({ where: { phone: userEntity.phone } });
      if (isPhoneUserValid) throw new HttpException(StatusCodes.CONFLICT, i18n.t('auth.yourArePhone'));
    }
    const userRole: number = userEntity.role;
    delete userEntity.role;
    const createData: IUser = await this.userModel.create(userEntity);

    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
    await this.userGroupModel.create({ userId: createData.id, groupId: userRole });
    await this.userModel.create(userEntity);
  }

  public async update(id: number, userEntity: UserEntity): Promise<void> {
    if (isEmpty(userEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));
    const userRole: number = userEntity.role;
    delete userEntity.role;

    const updateById = await this.userModel.update(userEntity, { where: { id: id } });
    if (!updateById) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
    const oldRole: IUserGroup = await this.userGroupModel.findOne({ where: { userId: id } });
    if (userRole != oldRole.groupId) {
      await this.userGroupModel.update({ groupId: userRole }, { where: { id: oldRole.id } });
    }

    await this.userModel.update(userEntity, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.userModel.destroy({ where: { id: id } });
  }
}
