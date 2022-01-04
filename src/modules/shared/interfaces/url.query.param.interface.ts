export interface UrlQueryParamInterface {
  getPipeLine(defaultPipeline?: AggregatePipeLine): AggregatePipeLine;

  encodeQueryParam(key: string, value: string, fun: string, sign: string): string;

  decodeQueryParam(): this;
  resetPipeLine(): this;
}

export interface QueryUrl {
  limit?: number;
  range?: string;
  page?: number;
  filed?: string;
  q?: string | object;
  order?: number | string;
  sort?: string;
}

export interface AggregatePipeLine {
  paginate?: number;
  page?: number;
  order?: any | object | any[] | object[];
  where?: any | object | any[] | object[];
  include?: any | object | any[] | object[];
  attributes?: any | object | any[] | object[];
}

export interface ISearch {
  sgn?: string | string[] | null | undefined;
  val: number | string | string[] | number[] | undefined;
  fun: string | undefined;
  jin?: string | null | undefined;
}
