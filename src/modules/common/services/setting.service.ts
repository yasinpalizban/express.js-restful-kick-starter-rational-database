import { HttpException } from '../../../core/exceptions/HttpException';
import { isEmpty } from './../../shared/utils/is.empty';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';

import { ISetting, ISettingPagination } from '../interfaces/setting.interface';

import { ServiceInterface } from './../../shared/interfaces/service.interface';
import { UrlQueryParam } from './../../shared/libraries/url.query.param';
import { AggregatePipeLine } from './../../shared/interfaces/url.query.param.interface';
import { IPagination } from './../../shared/interfaces/pagination';
import DB from '@/core/databases/database';
import { SettingEntity } from '../entities/setting.entity';
import { paginationFields } from '@/modules/shared/utils/pagntaion.fields';

export default class SettingService implements ServiceInterface {
  public settingModel = DB.setting;

  public async index(urlQueryParam: UrlQueryParam): Promise<ISettingPagination> {
    const pipeLine: AggregatePipeLine = urlQueryParam.decodeQueryParam().getPipeLine();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { docs, pages, total } = await this.settingModel.paginate(pipeLine);
    const data: ISetting[] = docs;
    const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
    return { data: data, pagination: paginate };
  }

  public async show(id: number): Promise<ISetting[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));
    const dataById: ISetting = await this.settingModel.findByPk(id);
    return [dataById];
  }

  public async create(settingEntity: SettingEntity): Promise<void> {
    if (isEmpty(settingEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.validation'));

    const createData: ISetting = await this.settingModel.create(settingEntity);
    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t('api.commons.reject'));
  }

  public async update(id: number, settingEntity: SettingEntity): Promise<void> {
    if (isEmpty(settingEntity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.settingModel.update(settingEntity, { where: { id: id } });
  }

  public async delete(id: number): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t('api.commons.reject'));

    await this.settingModel.destroy({ where: { id: id } });
  }
}
