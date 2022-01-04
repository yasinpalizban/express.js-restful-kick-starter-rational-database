import { Entity } from '../../shared/libraries/entity';

export class UserPermissionEntity extends Entity {
  id: number;
  actions: string;
  userId: number;
  permissionId: number;


  constructor(init?: Partial<UserPermissionEntity>) {
    super();
    Object.assign(this, init);

  }


}
