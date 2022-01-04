import { UrlQueryParam } from '../libraries/url.query.param';

export declare interface ServiceInterface {

  index?(urlQueryParam?: UrlQueryParam): Promise<any[] | any>;

  show?(id: number): Promise<any>;

  create?(data: any): Promise<void | any>;

  update?(id: number, data: any): Promise<void | any>;

  delete?(id: number, foreignKey?: string): Promise<void>;
}


