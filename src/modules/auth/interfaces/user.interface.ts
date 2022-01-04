import { IPagination } from './../../shared/interfaces/pagination';

export interface IUser {
  id: number;
  login?: string;
  group?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
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
}

export interface IUserPagination {
  data: IUser[];
  pagination?: IPagination;
}
