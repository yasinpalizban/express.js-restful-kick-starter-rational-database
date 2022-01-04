process.env['NODE_CONFIG_DIR'] = './src/core/configs';
import config from 'config';
import Sequelize from 'sequelize';
import { logger } from '../utils/logger';
import { userModel } from '../../modules/auth/models/users.model';
import { dbConfig } from '../interfaces/db.interface';
import { settingModel } from '../../modules/common/models/setting.model';
import { groupModel } from '../../modules/auth/models/group.model';
import { userGroupModel } from '../../modules/auth/models/user.group.model';
import { permissionsModel } from '../../modules/auth/models/permission.model';
import { groupPermissionsModel } from '../../modules/auth/models/group.permission.model';
import { userPermissionsModel } from '../../modules/auth/models/user.permission.model';
import { ipActivityModel } from '../../modules/auth/models/ip.activity.model';
console.log(config.get('dbConfig'));
const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timezone: '+09:00',
  port: 3306,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  users: userModel(sequelize),
  setting: settingModel(sequelize),
  group: groupModel(sequelize),
  userGroup: userGroupModel(sequelize),
  permission: permissionsModel(sequelize),
  groupPermission: groupPermissionsModel(sequelize),
  userPermission: userPermissionsModel(sequelize),
  ipActivity: ipActivityModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

DB.users.hasOne(DB.userGroup, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.group.hasOne(DB.userGroup, { foreignKey: 'groupId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.userGroup.belongsTo(DB.users, { foreignKey: 'userId' });
DB.userGroup.belongsTo(DB.group, { foreignKey: 'groupId' });

DB.permission.hasMany(DB.userPermission, { foreignKey: 'permissionId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.permission.hasMany(DB.groupPermission, { foreignKey: 'permissionId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.users.hasMany(DB.userPermission, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.group.hasMany(DB.groupPermission, { foreignKey: 'groupId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DB.userPermission.belongsTo(DB.permission, { foreignKey: 'permissionId' });
DB.userPermission.belongsTo(DB.users, { foreignKey: 'userId' });
DB.groupPermission.belongsTo(DB.permission, { foreignKey: 'permissionId' });
DB.groupPermission.belongsTo(DB.group, { foreignKey: 'groupId' });

export default DB;
