import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserGroup } from '../interfaces/group.user.interface';
import sequelizePaginate from 'sequelize-paginate';

export class UserGroupModel extends Model<IUserGroup> implements IUserGroup {
  userId: number;
  id?: number;
  groupId: number;
}

export function userGroupModel(sequelize: Sequelize): typeof UserGroupModel {
  UserGroupModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'auth_groups_users',
      sequelize,
      timestamps: false,
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(UserGroupModel)
  return UserGroupModel;
}
