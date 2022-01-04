import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import DB from '@/core/databases/database';
import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { IGroupPermission, IGroupPermissionPagination } from '../interfaces/group.permission.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { IPagination } from './../../shared/interfaces/pagination';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';
import { GroupPermissionEntity } from '@/modules/auth/entities/group.permission.entity';
import Sequelize, { Op } from 'sequelize';
export default class GroupPermissionService implements ServiceInterface {
  public groupPermissionsModel = DB.groupPermission;
  private nestId: number;

  constructor() {
    this.nestId = 0;
  }

  public setNestId(id: number) {
    this.nestId = id;
    return this;
  }

  public async index(urlQueryParam: UrlQueryParam): Promise<IGroupPermissionPagination> {
    const defaultPipeline: AggregatePipeLine = {
      attributes: [
        'id',
        'actions',
        'groupId',
        'permissionId',
        [Sequelize.literal('`PermissionsModel`.`name`'), 'permission'],
        [Sequelize.literal('`GroupModel`.`name`'), 'group'],
      ],
      include: [
        {
          model: DB.permission,
          attributes: [],
        },
        {
          model: DB.group,
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
    const { docs, pages, total } = await this.groupPermissionsModel.paginate(pipeLine);
    const data: IGroupPermission[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<IGroupPermission[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const data: IGroupPermission = await this.groupPermissionsModel.findOne({
      where: { id: id },
      attributes: [
        'id',
        'actions',
        'groupId',
        'permissionId',
        [Sequelize.literal('`PermissionsModel`.`name`'), 'permission'],
        [Sequelize.literal('`GroupModel`.`name`'), 'group'],
      ],
      include: [
        {
          model: DB.permission,
          attributes: [],
        },
        {
          model: DB.group,
          attributes: [],
        },
      ],
    });

    if (!data) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
    return [data];
  }

  public async create(groupPermissionEntity: GroupPermissionEntity): Promise<void> {
    if (isEmpty(groupPermissionEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));
    const createData: IGroupPermission = await this.groupPermissionsModel.create(groupPermissionEntity);
    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
  }

  public async update(id: number, data: GroupPermissionEntity): Promise<void> {
    if (isEmpty(data) && isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));
    await this.groupPermissionsModel.update(data, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));
    await this.groupPermissionsModel.destroy({ where: { id: id } });
  }
}
