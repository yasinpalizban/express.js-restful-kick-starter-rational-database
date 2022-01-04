import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserPermission } from '../interfaces/user.permission.interface';
import sequelizePaginate from 'sequelize-paginate';

export class UserPermissionsModel extends Model<IUserPermission> implements IUserPermission {
  id: number;
  actions: string;
  userId: number;
  permissionId: number;
}

export function userPermissionsModel(sequelize: Sequelize): typeof UserPermissionsModel {
  UserPermissionsModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      actions: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      permissionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'auth_users_permissions',
      sequelize,
      timestamps: false,
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(UserPermissionsModel);
  return UserPermissionsModel;
}
