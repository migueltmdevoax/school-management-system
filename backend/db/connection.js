import pkg from "pg"
const { Pool } = pkg

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "school_db",
  password: "panixtlh",
  port: 5432,
})