import {IsEmail, IsString} from 'class-validator';

export class AuthActivateTokenEmailValidation {
  @IsString()
  public activeToken: string;
  @IsEmail()
  public email: string;
}
