export const mockAuth = (req, res, next) => {
  // simulamos usuario logueado
  req.user = {
    role: "teacher", // cambia a admin / parent para probar
    studentId: 1
  }

  next()
}