import { Entity } from '../../shared/libraries/entity';

export class PermissionEntity extends Entity {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(init?: Partial<PermissionEntity>) {
    super();
    Object.assign(this, init);
  }


  public createNow(): this {
    this.createdAt = new Date();
    return this;
  }

  public updateNow(): this {
    this.updatedAt = new Date();
    return this;
  }

  public deleteNow(): this {
    this.deletedAt = new Date();
    return this;
  }

}
