import { Sequelize, DataTypes, Model } from 'sequelize';
import { IPermission } from '../interfaces/permission.interface';
import sequelizePaginate from 'sequelize-paginate';
export class PermissionsModel extends Model<IPermission> implements IPermission {
  public id: number;
  public name: string;
  public description: string;
  public active: boolean;
}

export function permissionsModel(sequelize: Sequelize): typeof PermissionsModel {
  PermissionsModel.init(
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
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      active: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
    },
    {
      tableName: 'auth_permissions',
      sequelize,
      timestamps: false,
    },
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(PermissionsModel);
  return PermissionsModel;
}
