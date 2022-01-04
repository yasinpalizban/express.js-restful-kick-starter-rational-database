import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { IPermission } from '../interfaces/permission.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { IPagination } from './../../shared/interfaces/pagination';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';
import { UserPermissionEntity } from '@/modules/auth/entities/user.permission.entity';
import { IUserPermission, IUserPermissionPagination } from '@/modules/auth/interfaces/user.permission.interface';
import DB from '@/core/databases/database';
import { Op, Sequelize } from 'sequelize';

export default class UserPermissionService implements ServiceInterface {
  public userPermissionsModel = DB.userPermission;
  private nestId: number;

  constructor() {
    this.nestId = 0;
  }

  public setNestId(id: number) {
    this.nestId = id;
    return this;
  }

  public async index(urlQueryParam: UrlQueryParam): Promise<IUserPermissionPagination> {
    const defaultPipeline: AggregatePipeLine = {
      attributes: [
        'id',
        'actions',
        'userId',
        'permissionId',
        [Sequelize.literal('`PermissionsModel`.`name`'), 'permission'],
        [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        [Sequelize.literal('`UserModel`.`username`'), 'username'],
      ],
      include: [
        {
          model: DB.permission,
          attributes: [],
        },
        {
          model: DB.users,
          attributes: [],
        },
      ],
    };
    if (this.nestId != 0) {
      defaultPipeline.where = { where: { [Op.eq]: this.nestId } };
    }
    const pipeLine: AggregatePipeLine = urlQueryParam.decodeQueryParam().getPipeLine(defaultPipeline);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { docs, pages, total } = await this.userPermissionsModel.paginate(pipeLine);
    const data: IUserPermission[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<IUserPermission[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const data: IUserPermission = await this.userPermissionsModel.findOne({
      where: { id: id },
      attributes: [
        'id',
        'actions',
        'userId',
        'permissionId',
        [Sequelize.literal('`PermissionsModel`.`name`'), 'permission'],
        [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        [Sequelize.literal('`UserModel`.`username`'), 'username'],
      ],

      raw: true,
      include: [
        {
          model: DB.permission,
          attributes: [],
        },
        {
          model: DB.users,
          attributes: [],
        },
      ],
    });

    if (!data) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));

    return [data];
  }

  public async create(userPermissionEntity: UserPermissionEntity): Promise<void> {
    if (isEmpty(userPermissionEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const createData: IUserPermission = await this.userPermissionsModel.create(userPermissionEntity);
    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
  }

  public async update(id: number, userPermissionEntity: UserPermissionEntity): Promise<void> {
    if (isEmpty(userPermissionEntity) && isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));
    await this.userPermissionsModel.update(userPermissionEntity, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.userPermissionsModel.destroy({ where: { id: id } });
  }
}
