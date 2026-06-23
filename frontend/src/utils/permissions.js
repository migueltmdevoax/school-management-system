export const PERMISSIONS = {
  admin:   ["*"],
  teacher: ["read:students", "create:grades", "update:grades", "read:grades", "create:incidents"],
  parent:  ["read:own_grades", "read:own_attendance", "read:own_incidents", "read:own_payments"],
};

export const hasPermission = (user, permission) => {
  if (!user?.role) return false;
  const rolePermissions = PERMISSIONS[user.role] || [];
  return rolePermissions.includes("*") || rolePermissions.includes(permission);
};