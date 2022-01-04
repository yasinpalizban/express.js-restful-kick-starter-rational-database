import { Sequelize, DataTypes, Model } from 'sequelize';
import { IIpActivity } from '../interfaces/ip.activity.interface';

export class IpActivityModel extends Model<IIpActivity> implements IIpActivity {
  id?: number;
  userId: number;
  success: boolean;
  login: string;
  ipAddress: string;
  userAgent: string;
  type: string;
  date: Date;
}

export function ipActivityModel(sequelize: Sequelize): typeof IpActivityModel {
  IpActivityModel.init(
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
      ipAddress: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      userAgent: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      date: {
        type: DataTypes.DATE,
      },
      success: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'auth_logins',
      sequelize,
      timestamps: false,
    },
  );

  return IpActivityModel;
}
