import { createContext, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const user = {
    name: "Miguel",
    role: "admin" // cambia a teacher o parent para probar
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}