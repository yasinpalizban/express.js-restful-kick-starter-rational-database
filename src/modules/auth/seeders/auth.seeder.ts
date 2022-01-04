import faker from 'faker';
import { Seeder } from '../../shared/libraries/seeder';

import { RoleType } from '../enums/role.type.enum';
import { IUser } from '../interfaces/user.interface';
import DB from '../../../core/databases/database';
import { AuthEntity } from '../entities/auth.entity';
import { IGroup } from '../interfaces/group.interface';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/auth.seeder.ts
 *  */

export default class AuthSeeder extends Seeder {
  public model = DB.users;
  public groupModel = DB.group;
  public userGroupModel = DB.userGroup;

  //default password is 1234
  async run(): Promise<void> {
    const dataSeeder = new AuthEntity({
      username: 'admin',
      phone: '0918000',
      email: 'admin@admin.com',
      password: '$2b$10$urCbSxfTDjo8GTTfD1aDMeqd0wv3oQQz.XE0MJ3oQ7G4MYq..FaIy',
      active: true,
      createdAt: faker.datatype.datetime(),
      image: 'public/upload/profile/default-avatar.jpg',
    });
    const authUser: IUser = await this.model.create(dataSeeder);
    const group: IGroup = await this.groupModel.findOne({ where: { name: RoleType.Admin } });
    await this.userGroupModel.create({ userId: authUser.id, groupId: group.id });
  }
}
