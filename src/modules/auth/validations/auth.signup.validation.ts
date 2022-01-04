import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsEqualTo } from '@/modules/auth/utils/is.equal.to';

export class AuthSignupValidation {
  @IsString()
  public login: string;
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  public password: string;
  @IsString()
  public userName: string;
  @IsString() @IsEqualTo('password')
  public passwordConfirm: string;
  @IsString()
  public token: string;
  @IsString()
  public action: string;
}
