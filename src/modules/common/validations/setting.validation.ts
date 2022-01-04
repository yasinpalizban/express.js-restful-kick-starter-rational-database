import { IsBoolean, IsString } from 'class-validator';

export class SettingValidation {
  @IsString()
  public key: string;
  @IsString()
  public value: string;
  @IsString()
  public description: string;
  @IsBoolean()
  public status: boolean;
}
