import express from "express"
import cors from "cors"
import studentRoutes from "./routes/studentRoutes.js"
import admissionRoutes from "./routes/admissionRoutes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/students", studentRoutes)
app.use("/api/admissions", admissionRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})



