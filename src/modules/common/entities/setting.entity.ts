import { Entity } from '../../shared/libraries/entity';

export class SettingEntity extends Entity {
  id: number;
  key: string;
  value: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(init?: Partial<SettingEntity>) {
    super();
    Object.assign(this, init);
  }




  public enableStatus(): this {
    this.status = true;
    return this;
  }

  public disableStatus(): this {
    this.status = false;
    return this;
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
