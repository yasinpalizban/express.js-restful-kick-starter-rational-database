import {IsEmail, IsString} from 'class-validator';

export class AuthSendActivateEmailValidation {
  @IsString() @IsEmail()
  public email: string;

}
