export const mockAuth = (role = "parent") => {
  return (req, res, next) => {
    const users = {
      parent: {
        id: "82318d19-3614-486a-9d5e-ea303ae9e5f3",
        role: "parent"
      },
      teacher: {
        id: "502e0ed7-f0ca-4eba-87b2-5178a1f51715",
        role: "teacher"
      },
      admin: {
        id: "admin-uuid-aqui",
        role: "admin"
      }
    };

    req.user = users[role];

    next();
  };
};