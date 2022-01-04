import faker from 'faker';
import { Seeder } from '../../shared/libraries/seeder';
import { SettingEntity } from '../entities/setting.entity';
import DB from '../../../core/databases/database';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../common/seeders/setting.seeder.ts
 *  */

export default class SettingSeeder extends Seeder {
  public model = DB.setting;

  async run(): Promise<void> {
    const dataSeeder = new SettingEntity({
      key: faker.internet.userName(),
      value: faker.address.city(),
      description: faker.address.streetAddress(),
      status: faker.datatype.boolean(),
      createdAt: faker.datatype.datetime(),

    });
    await this.model.create(dataSeeder);
  }
}
