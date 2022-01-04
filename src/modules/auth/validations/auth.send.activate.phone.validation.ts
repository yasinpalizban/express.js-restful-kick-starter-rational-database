import {IsEmail, IsString} from 'class-validator';

export class AuthSendActivatePhoneValidation {
  @IsString()
  public phone: string;

}
