import db from "../../config/db.js";

export const globalSearch = async (query) => {
  // Limitar longitud de búsqueda
  if (!query || query.trim().length < 2) return { students: [], teachers: [] };
  if (query.length > 100) return { students: [], teachers: [] };

  // Usar parameterized queries — ya protege contra SQL injection
  const searchTerm = `%${query.trim()}%`;

  const [students, teachers] = await Promise.all([
    db.query(
      `SELECT id, first_name, last_name, email, 'student' AS entity_type
       FROM students
       WHERE first_name ILIKE $1 OR last_name ILIKE $1
       LIMIT 5`,
      [searchTerm]
    ),
    db.query(
      `SELECT id, first_name, last_name, email, 'teacher' AS entity_type
       FROM teachers
       WHERE first_name ILIKE $1 OR last_name ILIKE $1
       LIMIT 5`,
      [searchTerm]
    ),
  ]);

  return {
    students: students.rows,
    teachers: teachers.rows,
  };
};