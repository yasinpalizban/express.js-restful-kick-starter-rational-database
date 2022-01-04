import { Entity } from '../../shared/libraries/entity';

export class GroupPermissionEntity extends Entity {
  id: number;
  actions: string;
  groupId: number;
  permissionId: number;



  constructor(init?: Partial<GroupPermissionEntity>) {
    super();
    Object.assign(this, init);

  }


}
