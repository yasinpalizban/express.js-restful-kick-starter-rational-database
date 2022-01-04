import DB from '../../../core/databases/database';

process.env['NODE_CONFIG_DIR'] = './src/core/configs';
import { SeederInterface } from '../interfaces/seeder.interface';

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *  */
export class Seeder implements SeederInterface {
  constructor() {
    DB.sequelize.sync({ force: false });
  }

  async run(): Promise<void> {
    //
  }
}
