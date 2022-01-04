import { IsString } from "class-validator";

export class UserPermissionValidation {
  @IsString()
  public userId: string;
  @IsString()
  public actions: string;


}
