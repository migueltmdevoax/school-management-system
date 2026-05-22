import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    console.log("VERIFY TOKEN RUNNING")
  try {
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Invalid token format" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("TOKEN OK:", decoded)

    req.user = decoded

    next()

  } catch (error) {
    console.log("TOKEN ERROR:", error.message)
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors
    })
  }
}