import { Sequelize, DataTypes, Model } from 'sequelize';
import { IGroup } from '../interfaces/group.interface';
import sequelizePaginate from 'sequelize-paginate';
import { UserGroupModel } from '../models/user.group.model';

export class GroupModel extends Model<IGroup> implements IGroup {
  public id: number;
  public name: string;
  public description: string;

  async getUserForGroup(id: number): Promise<IGroup> {
    return await GroupModel.findOne({
      include: [
        {
          model: UserGroupModel,
          where: { userId: id },
          attributes: [],
        },
      ],
    });
  }
}

export function groupModel(sequelize: Sequelize): typeof GroupModel {
  GroupModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'auth_groups',
      sequelize,
      timestamps: false,
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(GroupModel);

  return GroupModel;
}
