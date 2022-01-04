import { IsString, MaxLength, MinLength} from 'class-validator';
import { IsEqualTo } from '@/modules/auth/utils/is.equal.to';

export class AuthResetPasswordPhoneValidation {
  @IsString()
  public phone: string;
  @IsString()
  public resetToken: string;
  @IsString()   @MinLength(4) @MaxLength(12)
  public password: string;
  @IsString() @IsEqualTo('password')
  public passwordConfirm: string;

}
