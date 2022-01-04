import * as config from 'config';
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import { Entity } from '../../shared/libraries/entity';

export class UserEntity extends Entity {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: number;
  email: string;
  phone: string;
  image: string;
  address: string;
  gender: boolean;
  country: string;
  city: string;
  active: boolean;
  activeToken: string;
  activeExpires: Date;
  status: boolean;
  statusMessage: string;
  resetToken: string;
  resetExpires: Date;
  resetAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(init?: Partial<UserEntity>) {
    super();
    Object.assign(this, init);
  }

  public activate(): this {
    this.active = true;
    return this;
  }

  public deActivate(): this {
    this.active = false;
    return this;
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

  public resetNow(): this {
    this.resetAt = new Date();
    return this;
  }

  public resetExpiration(): this {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.resetExpires = tomorrow;
    return this;
  }

  public activateExpiration(): this {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.activeExpires = tomorrow;
    return this;
  }

  public generateRestToken(): this {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const secretKey: string = config.get('password.Key');
    this.resetToken = CryptoJS.SHA256(timestamp + '|' + secretKey).toString(CryptoJS.enc.Hex);
    return this;
  }

  public generateActivateToken(): this {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const secretKey: string = config.get('password.Key');
    this.activeToken = CryptoJS.SHA256(timestamp + '|' + secretKey).toString(CryptoJS.enc.Hex);
    return this;
  }

  public async generatePasswordHash(): Promise<this> {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);

    return this;
  }

  public logInMode(): this {
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!isNaN(Number(this.login))) {
      this.phone = this.login;
    } else if (regexEmail.test(this.login)) {
      this.email = this.login;
    } else {
      this.username = this.login;
    }
    this.login = undefined;
    return this;
  }
}
