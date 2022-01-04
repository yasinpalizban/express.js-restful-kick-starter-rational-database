import { Seeder } from '../../shared/libraries/seeder';
import DB from '../../../core/databases/database';
import { UserPermissionEntity } from '../entities/user.permission.entity';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/user.permission.seeder.ts
 *  */

export default class UserPermissionSeeder extends Seeder {
  public model = DB.userPermission;

  async run(): Promise<void> {
    const dataSeeder = [
      new UserPermissionEntity({
        id: 1,
        permissionId: 2,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 2,
        permissionId: 3,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 3,
        permissionId: 4,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 4,
        permissionId: 5,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 5,
        permissionId: 6,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
    ];
    await this.model.bulkCreate(dataSeeder);
  }
}
