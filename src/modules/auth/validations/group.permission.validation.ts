import { IsString } from "class-validator";

export class GroupPermissionValidation {
  @IsString()
  public groupId: string;
  @IsString()
  public actions: string;


}
