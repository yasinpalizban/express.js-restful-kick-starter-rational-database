import {IsString} from "class-validator";

export class GroupValidation {
  @IsString()
  public name: string;
  @IsString()
  public description: string;


}
