import { IUser } from './user.interface';
import { TokenData } from './jwt.token.interface';
import { IPermission } from '../interfaces/permission.interface';
import { IGroupPermission } from '../interfaces/group.permission.interface';
import { IUserPermission } from '../interfaces/user.permission.interface';
import { IGroup } from '../interfaces/group.interface';

export interface ILogIn {
  cookie: string;
  findUser: IUser;
  jwt: TokenData;
  permissions: IPermission[];
  permissionUser: IUserPermission[];
  permissionGroup: IGroupPermission[];
  role: IGroup;
}

export interface IUserLogIn extends IUser {
  role?: {
    id: number;
    name: string;
  };
}
