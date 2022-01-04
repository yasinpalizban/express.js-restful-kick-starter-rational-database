import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';

import { IGroup, IGroupPagination } from '../interfaces/group.interface';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { IPagination } from './../../shared/interfaces/pagination';
import DB from '@/core/databases/database';
import { GroupEntity } from '@/modules/auth/entities/group.entity';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';

export default class GroupService implements ServiceInterface {
  public groupModel = DB.group;

  public async index(urlQueryParam: UrlQueryParam): Promise<IGroupPagination> {
    const pipeLine: AggregatePipeLine = urlQueryParam.decodeQueryParam().getPipeLine();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { docs, pages, total } = await this.groupModel.paginate(pipeLine);
    const data: IGroup[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<IGroup[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));
    const dataById: IGroup = await this.groupModel.findByPk(id);
    if (!dataById) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.exist'));
    return [dataById];
  }

  public async create(groupEntity: GroupEntity): Promise<void> {
    if (isEmpty(groupEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const createData: IGroup = await this.groupModel.create(groupEntity);

    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
  }

  public async update(id: number, groupEntity: GroupEntity): Promise<void> {
    if (isEmpty(groupEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    await this.groupModel.update(groupEntity, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.groupModel.destroy({ where: { id: id } });
  }
}
