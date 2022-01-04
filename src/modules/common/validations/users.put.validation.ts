import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UsersPutValidation {
  @IsString()
  @IsOptional()
  public password: string;
  @IsString()
  @IsOptional()
  public role: string;
  @IsOptional()
  @IsString()
  public firstName: string;
  @IsOptional()
  @IsString()
  public lastName: string;
  @IsOptional()
  @IsBoolean()
  public status: boolean;
}
