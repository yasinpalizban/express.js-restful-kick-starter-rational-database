import { RoleType } from '../enums/role.type.enum';

export class RoleRouteService {
  public getRoleAccess(name: string): [] | null {
    const listOfRule = {
      profile: null,
      graph: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
      overView: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
      user: [RoleType.Admin, RoleType.Coworker],
      permission: [RoleType.Admin],
      userPermission: [RoleType.Admin],
      GroupPermission: [RoleType.Admin],
      setting: [RoleType.Admin],
    };


    for (const key in listOfRule) {
      if (key === name) {

        return listOfRule[key];
      }
    }
    return null;

  }


}
