import faker from 'faker';
import { Seeder } from '../../shared/libraries/seeder';
import DB from '../../../core/databases/database';
import { PermissionEntity } from '../entities/permission.entity';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/permission.seeder.ts
 *  */

export default class PermissionSeeder extends Seeder {
  public model = DB.permission;

  async run(): Promise<void> {
    const dataSeeder = [
      new PermissionEntity({
        id: 1,
        name: 'user',
        description: 'users manage controller',
        active: false,
      }),
      new PermissionEntity({
        id: 2,
        name: 'setting',
        description: 'setting manage controller',
        active: false,
      }),
      new PermissionEntity({
        id: 3,
        name: 'permission',
        description: 'permission manage controller',
        active: false,
      }),
      new PermissionEntity({
        id: 4,
        name: 'userPermission',
        description: ' user permission manage controller',
        active: false,
      }),
      new PermissionEntity({
        id: 5,
        name: 'groupPermission',
        description: ' group permission manage controller',
        active: false,
      }),
      new PermissionEntity({
        id: 6,
        name: 'group',
        description: 'group  manage controller',
        active: false,
      }),
    ];
    await this.model.bulkCreate(dataSeeder);
  }
}
