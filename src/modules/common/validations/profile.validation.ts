import { IsEmail, IsString, IsOptional } from 'class-validator';
import { IsEqualTo } from '@/modules/auth/utils/is.equal.to';

export class ProfileValidation {
  @IsString()
  @IsOptional()
  public userName: string;
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phone: string;

  @IsString()
  @IsOptional()
  public firstName: string;

  @IsString()
  @IsOptional()
  public lastName: string;

  @IsString()
  @IsOptional()
  public address: string;

  @IsString()
  @IsOptional()
  public country: string;

  @IsString()
  @IsOptional()
  public city: string;

  @IsString()
  @IsOptional()
  public image: string;

  @IsString()
  @IsOptional()
  public gender: string;

  @IsString()
  @IsOptional()
  public password: string;
  @IsString()
  @IsOptional()
  @IsEqualTo('password')
  public passConfirm: string;
}
