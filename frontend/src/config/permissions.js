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