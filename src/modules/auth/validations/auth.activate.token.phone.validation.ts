import { IsString} from 'class-validator';

export class AuthActivateTokenPhoneValidation {
  @IsString()
  public activeToken: string;
  @IsString()
  public phone: string;
}
