import { Seeder } from '../../shared/libraries/seeder';
import DB from '../../../core/databases/database';
import { GroupPermissionEntity } from '../entities/group.permission.entity';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/group.permission.seeder.ts
 *  */

export default class GroupPermissionSeeder extends Seeder {
  public model = DB.groupPermission;
  async run(): Promise<void> {
    const dataSeeder = [
      new GroupPermissionEntity({
        id: 1,
        actions: 'get-',
        groupId: 1,
        permissionId: 1,
      }),
      new GroupPermissionEntity({
        id: 2,
        actions: 'get-post-put-delete',
        groupId: 1,
        permissionId: 2,
      }),
      new GroupPermissionEntity({
        id: 3,
        actions: 'get-',
        groupId: 1,
        permissionId: 3,
      }),
      new GroupPermissionEntity({
        id: 4,
        actions: 'get-',
        groupId: 1,
        permissionId: 4,
      }),
      new GroupPermissionEntity({
        id: 5,
        actions: 'get-',
        groupId: 1,
        permissionId: 5,
      }),
      new GroupPermissionEntity({
        id: 6,
        actions: 'get-',
        groupId: 1,
        permissionId: 6,
      }),
    ];
    await this.model.bulkCreate(dataSeeder);
  }
}
