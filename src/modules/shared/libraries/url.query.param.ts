import { AggregatePipeLine, ISearch, QueryUrl, UrlQueryParamInterface } from '../interfaces/url.query.param.interface';
import { Request } from 'express';
import * as URL from 'url';
import { UrlWithStringQuery } from 'url';
import queryString from 'query-string';
import { SearchFunctionType } from '../enum/search.function';
import { changeKeyObject, convertFunctionType, convertSignType, parseString } from '../utils/parse.str.helper';
import { isEmpty } from '@/modules/shared/utils/is.empty';
import { Op } from 'sequelize';

export class UrlQueryParam implements UrlQueryParamInterface {
  private queryUrl: QueryUrl;

  private pipeLine: AggregatePipeLine;

  constructor(request: Request) {
    const uri: UrlWithStringQuery = URL.parse(request.url);
    const parseUri: QueryUrl = queryString.parse(uri.query);

    parseUri.sort = parseUri.sort ?? 'id';
    parseUri.order = parseUri.order ?? 'DESC';
    parseUri.page = parseUri.page ?? 1;
    parseUri.limit = parseUri.limit ?? 10;

    if (parseUri.q) {
      parseUri.q = parseString(parseUri.q.toString());
      parseUri.q = queryString.parse(parseUri.q);
    }

    this.queryUrl = parseUri;
    this.pipeLine = { where: [], include: [] };
  }

  public getPipeLine(defaultPipeline?: AggregatePipeLine): AggregatePipeLine {
    this.pipeLine.page = this.queryUrl.page;
    this.pipeLine.paginate = this.queryUrl.limit;

    if (this.queryUrl.sort) {
      this.pipeLine.order = [[this.queryUrl.sort, this.queryUrl.order]];
    }

    if (this.pipeLine.include.length && !isEmpty(defaultPipeline)) {
      this.pipeLine.attributes = defaultPipeline.attributes;
      let counter = 0;
      for (const item of defaultPipeline.include) {
        for (const item2 of this.pipeLine.include) {
          if (item.model.name == item2.model) {
            defaultPipeline.include[counter].where = item2.where;
          }
        }
        counter++;
      }
      this.pipeLine.include = defaultPipeline.include;
    } else if (!isEmpty(defaultPipeline)) {
      this.pipeLine.attributes = defaultPipeline.attributes;
      this.pipeLine.include = defaultPipeline.include;
    }
    if (this.queryUrl.filed) {
      const combine: string[] = [];
      this.queryUrl.filed.split(',').forEach(item => {
        if (item != undefined) combine.push(item);
      });

      this.pipeLine.attributes = combine;
    }

    return this.pipeLine;
  }

  encodeQueryParam(key: string, value: string, $function: string, sign: string): string {
    let obj: any = {
      $$$: {
        val: value,
        fun: $function,
        sgn: sign,
      },
    };

    obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');

    return 'q=' + encodeURIComponent(JSON.stringify(obj));
  }

  decodeQueryParam(): this {
    const arrayParams: any[] = isEmpty(this.queryUrl.q) ? [] : Object.entries(this.queryUrl.q);

    for (let i = 0; i < arrayParams.length; i++) {
      const key: string = arrayParams[i][0];

      const valueSearch: ISearch = JSON.parse(arrayParams[i][1]);

      if (valueSearch.jin) {
        //   where: { id: { [Op.gt]: 6 } }
        if (valueSearch?.sgn != undefined && valueSearch?.sgn != 'None') {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = convertSignType(valueSearch.sgn, valueSearch.val);
          this.pipeLine.include = [{ model: valueSearch.jin, where: obj }];
        } else {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = valueSearch.val;
          this.pipeLine.include = [{ model: valueSearch.jin, where: obj }];
        }
      } else if (convertFunctionType(valueSearch.fun) == SearchFunctionType.where) {
        //   where: { id: { [Op.gt]: 6 } }
        if (valueSearch?.sgn != undefined && valueSearch?.sgn != 'None') {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = convertSignType(valueSearch.sgn, valueSearch.val);
          this.pipeLine.where.push(obj);
        } else {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = valueSearch.val;
          this.pipeLine.where.push(obj);
        }
      } else if (convertFunctionType(valueSearch.fun) == SearchFunctionType.orWhere) {
        //   orWhere: { id: { [Op.gt]: 6 } }
        if (valueSearch?.sgn != undefined && valueSearch?.sgn != 'None') {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = { [Op.or]: convertSignType(valueSearch.sgn, valueSearch.val) };
          this.pipeLine.where.push(obj);
        } else {
          let obj: any = { $$$: null };
          obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
          obj[key] = { [Op.or]: valueSearch.val };
          this.pipeLine.where.push(obj);
        }
      } else if (convertFunctionType(valueSearch.fun) == SearchFunctionType.whereIn) {
        //  where: { name: { [Op.in]: `%elliot%` } }
        let obj: any = { $$$: null };
        obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
        obj[key] = { [Op.in]: valueSearch.val };
        this.pipeLine.where.push(obj);
      } else if (convertFunctionType(valueSearch.fun) == SearchFunctionType.whereNoTIn) {
        //  where: { name: { [Op.in]:  } }

        let obj: any = { $$$: null };
        obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
        obj[key] = { [Op.notIn]: valueSearch.val };
        this.pipeLine.where.push(obj);
      } else if (convertFunctionType(valueSearch.fun) == SearchFunctionType.like) {
        //  where: { name: { [Op.like]: `%elliot%` } }
        let obj: any = { $$$: null };
        obj = changeKeyObject(obj, '"$$$"', '"' + key + '"');
        obj[key] = { [Op.like]: '%' + valueSearch.val };
        this.pipeLine.where.push(obj);
      }
    }

    return this;
  }

  public resetPipeLine(): this {
    this.pipeLine = {};
    return this;
  }
}
