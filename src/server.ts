import IndexRoute from '@/modules/home/routes/index.route';

process.env['NODE_CONFIG_DIR'] = __dirname + '/core/configs';

import 'dotenv/config';
import App from '@/app';

import AuthRoute from '@/modules/auth/routes/auth.route';
import validateEnv from '@/core/utils/validateEnv';
import UserRoute from '@/modules/common/routes/user.route';
import ProfileRoute from '@/modules/common/routes/profile.route';
import SettingRoute from '@/modules/common/routes/setting.route';
import GroupRoute from '@/modules/auth/routes/group.route';
import GroupPermissionRoute from '@/modules/auth/routes/group.permission.route';
import UserPermissionRoute from '@/modules/auth/routes/user.permission.route';
import PermissionRoute from '@/modules/auth/routes/permission.route';
import OverViewRoute from '@/modules/app/routes/over.view.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UserRoute(),
  new AuthRoute(),
  new GroupRoute(),
  new PermissionRoute(),
  new GroupPermissionRoute(),
  new UserPermissionRoute(),
  new ProfileRoute(),
  new SettingRoute(),
  new GroupRoute(),
  new OverViewRoute(),
]);

app.listen();
