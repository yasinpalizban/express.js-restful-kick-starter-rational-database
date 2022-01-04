import { IPagination } from '../../shared/interfaces/pagination';

export interface IUserPermission {
  id: number;
  actions: string;
  userId: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  permission?: string;
  permissionId: number;
}

export interface IUserPermissionPagination {
  data: IUserPermission[];
  pagination?: IPagination;
}
