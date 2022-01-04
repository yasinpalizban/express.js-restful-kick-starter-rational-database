import { IPagination } from '../../shared/interfaces/pagination';

export interface IUserGroup {
  id?: number;
  userId: number;
  groupId: number;
}

export interface IUserGroupPagination {
  data: IUserGroup[];
  pagination: IPagination;
}
