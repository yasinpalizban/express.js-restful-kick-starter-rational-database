import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ISetting } from '@/modules/common/interfaces/setting.interface';
import sequelizePaginate from 'sequelize-paginate';

export class SettingModel extends Model<ISetting> implements ISetting {
  public id?: number;
  public key: string;
  public value: string;
  public description: string;
  public status: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export function settingModel(sequelize: Sequelize): typeof SettingModel {
  SettingModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'setting',
      sequelize,
      timestamps: false,
    },
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sequelizePaginate.paginate(SettingModel);

  return SettingModel;
}
