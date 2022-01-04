import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersPostValidation {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public phone: string;
  @IsString()
  public userName: string;
  @IsString()
  public role: string;
  @IsOptional()
  @IsString()
  public firstName: string;
  @IsOptional()
  @IsString()
  public lastName: string;
}
