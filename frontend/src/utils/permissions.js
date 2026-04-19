import { PERMISSIONS } from "../config/permissions"

export const hasPermission = (user, permission) => {
  const rolePermissions = PERMISSIONS[user?.role] || []

  return (
    rolePermissions.includes("*") ||
    rolePermissions.includes(permission)
  )
}