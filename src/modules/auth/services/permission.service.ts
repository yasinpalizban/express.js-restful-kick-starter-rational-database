import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';

import { IPermission, IPermissionPagination } from '../interfaces/permission.interface';
import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { IPagination } from './../../shared/interfaces/pagination';
import DB from '@/core/databases/database';
import { PermissionEntity } from '@/modules/auth/entities/permission.entity';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';

export default class PermissionService implements ServiceInterface {
  public permissionModel = DB.permission;

  public async index(urlQueryParam: UrlQueryParam): Promise<IPermissionPagination> {
    const pipeLine: AggregatePipeLine = urlQueryParam.decodeQueryParam().getPipeLine();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { docs, pages, total } = await this.permissionModel.paginate(pipeLine);
    const data: IPermission[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<IPermission[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const dataById: IPermission = await this.permissionModel.findByPk(id);
    if (!dataById) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.exist'));
    return [dataById];
  }

  public async create(permissionEntity: PermissionEntity): Promise<void> {
    if (isEmpty(permissionEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const createData: IPermission = await this.permissionModel.create(permissionEntity);

    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
  }

  public async update(id: number, permissionEntity: PermissionEntity): Promise<void> {
    if (isEmpty(permissionEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    await this.permissionModel.update(permissionEntity, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.permissionModel.destroy({ where: { id: id } });
  }
}
