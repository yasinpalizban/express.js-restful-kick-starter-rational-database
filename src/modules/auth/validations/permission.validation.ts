import { IsBoolean, IsString } from "class-validator";

export class PermissionValidation {
  @IsString()
  public name: string;
  @IsString()
  public description: string;
  @IsBoolean()
  public active: boolean;


}
