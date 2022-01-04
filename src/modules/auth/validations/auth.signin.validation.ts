import {IsString,IsOptional, MaxLength, MinLength} from 'class-validator';

export class AuthSigninValidation {
  @IsString()
  public login: string;
  @IsString()  @MinLength(4) @MaxLength(12)
  public password: string;
  @IsOptional()
  public remember;

}
