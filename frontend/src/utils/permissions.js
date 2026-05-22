export const PERMISSIONS = {
  admin: ["*"],

  teacher: [
    "read:students",
    "create:grades",
    "update:grades",
    "read:grades"
  ],

  parent: [
    "read:own_grades"
  ]
}

export const hasPermission = (user, permission) => {
  const rolePermissions = PERMISSIONS[user?.role] || []

  return (
    rolePermissions.includes("*") ||
    rolePermissions.includes(permission)
  )
}