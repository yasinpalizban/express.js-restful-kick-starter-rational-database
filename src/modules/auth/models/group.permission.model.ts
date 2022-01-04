import { Sequelize, DataTypes, Model } from 'sequelize';
import { IGroupPermission } from '../interfaces/group.permission.interface';
import sequelizePaginate from 'sequelize-paginate';

export class GroupPermissionsModel extends Model<IGroupPermission> implements IGroupPermission {
  public id: number;
  actions: string;
  groupId: number;
  permissionId: number;
}

export function groupPermissionsModel(sequelize: Sequelize): typeof GroupPermissionsModel {
  GroupPermissionsModel.init(
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
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'auth_groups_permissions',
      sequelize,
      timestamps: false,
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(GroupPermissionsModel);
  return GroupPermissionsModel;
}
