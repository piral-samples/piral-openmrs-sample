const superUserRole = 'System Developer';

function userHasPrivilege(requiredPrivilege: string, user: any) {
  return user.privileges.find((p) => requiredPrivilege === p.display);
}

function isSuperUser(user: any) {
  return user.roles.find((role) => role.display === superUserRole);
}

export function userHasAccess(requiredPrivilege: string, user: any) {
  return userHasPrivilege(requiredPrivilege, user) || isSuperUser(user);
}
