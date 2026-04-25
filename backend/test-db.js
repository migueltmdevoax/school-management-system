import { pool } from "./db/connection.js"

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()")
    console.log(res.rows)
  } catch (error) {
    console.error(error)
  }
}

test()