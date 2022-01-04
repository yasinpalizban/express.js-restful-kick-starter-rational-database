import {IsString} from 'class-validator';

export class AuthForgotValidation {
  @IsString()
  public login: string;
  @IsString()
  public token: string;
  @IsString()
  public action: string;

}
